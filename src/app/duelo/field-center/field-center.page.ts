import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { CalculadoraPage } from '../calculadora/calculadora.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

import { LuckComponent } from '../../luck/luck.component';

interface Jogador{
  jogador: String,
  pontosDeVida: String,
  orientacao: String,
  pontosMemoria: String
}

@Component({
  selector: 'app-field-center',
  templateUrl: './field-center.page.html',
  styleUrls: ['./field-center.page.scss'],
})

export class FieldCenterPage implements OnInit {

  jogador1;
  jogador2;
  tipoDuelo = "";

  constructor(private router: Router, private modalController: ModalController, 
    private screen: ScreenOrientation, private speech: SpeechRecognition, private zone: NgZone, private alertController: AlertController) {
    this.getTipoDuelo();
   }

  ngOnInit() {
  }

  getTipoDuelo(){
    let getNav = this.router.getCurrentNavigation();
    if(getNav.extras.state){
      this.tipoDuelo = getNav.extras.state.tipo;
      this.setDuel(this.tipoDuelo);
    }
  }

  setDuelistas(jogador: Jogador){
    var jogador = jogador;
    return jogador;
  }

  async callCalculadora(jogador){
    let lifePoints;
    let orientacaoTela;
    let pontosMemoria;
    if(jogador === 'j1'){
      lifePoints = this.jogador1.pontosDeVida;
      orientacaoTela = this.jogador1.orientacao;
      pontosMemoria = this.jogador1.pontosMemoria;
    }else if(jogador === 'j2'){
      lifePoints = this.jogador2.pontosDeVida;
      orientacaoTela = this.jogador2.orientacao;
      pontosMemoria = this.jogador2.pontosMemoria;
    }
    const modal = await this.modalController.create({
      component: CalculadoraPage,
      componentProps:{
        'lifePoints': lifePoints,
        'orientacao': orientacaoTela,
        'jogador': jogador,
        'pontosMemoria': pontosMemoria
      }
    });
    modal.present();
    
    const {data} = await modal.onWillDismiss();

    if(data.jogador === 'j1'){
      this.jogador1.pontosDeVida = data.lifePoints;
      this.jogador1.pontosMemoria = data.pontosMemoria;
    }else if(data.jogador === 'j2'){
      this.jogador2.pontosDeVida = data.lifePoints;
      this.jogador2.pontosMemoria = data.pontosMemoria;
    }

    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  listening(jogador, pontosDeVida){
    this.getPermission();
    let options = {
      prompt: "Diga " + pontosDeVida + " e a operação. "+
      "Ex: "+pontosDeVida+" - 5000, "+pontosDeVida+" + 1000",
      showPopup: true,
      showPartial: true
    }
    this.speech.startListening(options).subscribe((matches: string[])=>{
      
      if(matches[0].search(pontosDeVida + " ") !== -1){
        let operacao;
        if(matches[0].indexOf(" x ") !== -1){
          operacao = matches[0].replace(" x "," * ");
        }else{
          operacao = matches[0];
        }

        if(eval(operacao) < 0){
          operacao = "0"
        }

        if(jogador === 'Jogador 1'){
          console.log(matches[0]);
          this.jogador1.pontosMemoria = pontosDeVida;
          this.jogador1.pontosDeVida = eval(operacao);      
        }else{
          this.jogador2.pontosMemoria = pontosDeVida;
          this.jogador2.pontosDeVida = eval(operacao);
        }
        this.zone.run(()=>{
          console.log('recarregado');
        })
      }else{
        alert("Pronuncie corretamente seus pontos de vida atuais");
      }
    },
    (error)=>{
      console.log(error)
    });
    
  }

  getPermission(){
    this.speech.hasPermission().then((hasPermission: boolean)=>{
      if(!hasPermission){
        this.speech.requestPermission().then(()=>console.log("Permitido"), 
        ()=>console.log("Negado"));
      }
    })
  }

  backToHome(){
    this.router.navigate(["/home"]);
  }

  setDuel(tipoDuelo){
    if(tipoDuelo === "dueloClassico"){
      this.jogador1 = this.setDuelistas({jogador: "Jogador 1", pontosDeVida: "8000",
       orientacao: "normal", pontosMemoria: ""});
      this.jogador2 = this.setDuelistas({jogador: "Jogador 2", pontosDeVida: "8000",
       orientacao: "invertido", pontosMemoria: ""});
    }else if(tipoDuelo === "speedDuel"){
      this.jogador1 = this.setDuelistas({jogador: "Jogador 1", pontosDeVida: "4000",
       orientacao: "normal", pontosMemoria: ""});
      this.jogador2 = this.setDuelistas({jogador: "Jogador 2", pontosDeVida: "4000",
       orientacao: "invertido", pontosMemoria: ""}); 
    }
  }

  async chooseLuckAlert(){
    let alert = await this.alertController.create();
    let type
    alert.message = "Escolha qual a forma de tirar a sorte!";
    alert.buttons = [{
      text: "Cara ou Coroa",
      handler: ()=>{
        this.showLuckModal("Cara ou Coroa");
      }
    },{
      text: "Dados",
      handler: ()=>{
        this.showLuckModal("Dados");
      }
    }]

    alert.present();
  }

  async showLuckModal(tipo){
    const luckModal = await this.modalController.create({
      component: LuckComponent,
      componentProps: {
        type: tipo
      }
    });
    luckModal.present();

    await luckModal.onWillDismiss();
  }

  setScreenActive(){

  }
}
