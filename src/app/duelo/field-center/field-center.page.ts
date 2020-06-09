import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalculadoraPage } from '../calculadora/calculadora.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

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
    private screen: ScreenOrientation, private speech: SpeechRecognition, private zone: NgZone) {
    this.getTipoDuelo();
   }

  ngOnInit() {
  }

  getTipoDuelo(){
    let getNav = this.router.getCurrentNavigation();
    if(getNav.extras.state){
      this.tipoDuelo = getNav.extras.state.tipo;

      if(this.tipoDuelo === "dueloClassico"){
        this.jogador1 = this.setDuelistas({jogador: "Jogador 1", pontosDeVida: "8000",
         orientacao: "normal", pontosMemoria: ""});
        this.jogador2 = this.setDuelistas({jogador: "Jogador 2", pontosDeVida: "8000",
         orientacao: "invertido", pontosMemoria: ""});
      }else if(this.tipoDuelo === "speedDuel"){
        this.jogador1 = this.setDuelistas({jogador: "Jogador 1", pontosDeVida: "4000",
         orientacao: "normal", pontosMemoria: ""});
        this.jogador2 = this.setDuelistas({jogador: "Jogador 2", pontosDeVida: "4000",
         orientacao: "invertido", pontosMemoria: ""}); 
      }
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

  async listening(jogador, pontosDeVida){
    this.requestPermission();
    await this.speech.startListening().subscribe((matches: string[])=>{
      if(jogador === 'Jogador 1'){
        this.jogador1.pontosMemoria = pontosDeVida;
        this.jogador1.pontosDeVida = eval(matches[0]);      
      }else{
        this.jogador2.pontosMemoria = pontosDeVida;
        this.jogador2.pontosDeVida = eval(matches[0]);
      }

      this.zone.run(()=>{
        console.log('recarregado');
      })
    },
    (error)=>{
      console.log(error)
    });
    
  }

  requestPermission(){
    this.speech.requestPermission().then(()=>{console.log("Permitido")});
  }
}
