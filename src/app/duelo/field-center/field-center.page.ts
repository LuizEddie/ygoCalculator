import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CalculadoraPage } from '../calculadora/calculadora.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-field-center',
  templateUrl: './field-center.page.html',
  styleUrls: ['./field-center.page.scss'],
})
export class FieldCenterPage implements OnInit {

  private jogador1 = {jogador: "", pontosDeVida: "", orientacao: "", pontosMemoria: ""};
  private jogador2 = {jogador: "", pontosDeVida: "", orientacao: "", pontosMemoria: ""};

  private tipoDuelo = "";

  constructor(private router: Router, private modalController: ModalController, 
    private screen: ScreenOrientation) {
    
    this.getTipoDuelo();
   }

  ngOnInit() {
  }

  getTipoDuelo(){
    let getNav = this.router.getCurrentNavigation();
    if(getNav.extras.state){
      this.tipoDuelo = getNav.extras.state.tipo;

      if(this.tipoDuelo === "dueloClassico"){
        this.setDuelistas('8000');
      }else if(this.tipoDuelo === "speedDuel"){
        this.setDuelistas('4000'); 
      }
    }
  }

  setDuelistas(pontosDeVida){
    this.jogador1.jogador = "Jogador 1";
    this.jogador1.pontosDeVida = pontosDeVida;
    this.jogador1.orientacao = "normal";

    this.jogador2.jogador = "Jogador 2";
    this.jogador2.pontosDeVida = pontosDeVida;
    this.jogador2.orientacao = "invertido";
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
      pontosMemoria = this.jogador1.pontosMemoria;
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

}
