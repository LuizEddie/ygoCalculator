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

  private lifePoints1 = "8000";
  private lifePoints2 = "8000";
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
        this.lifePoints1 = "8000";
        this.lifePoints2 = "8000";
      }else if(this.tipoDuelo === "speedDuel"){
        this.lifePoints1 = "4000";
        this.lifePoints2 = "4000";
      }
    }
  }

  async callCalculadora(orientacaoTela, jogador){
    let lifePoints;
    if(jogador === "j1"){
      lifePoints = this.lifePoints1
    }else if(jogador === 'j2'){
      lifePoints = this.lifePoints2
    }
    const modal = await this.modalController.create({
      component: CalculadoraPage,
      componentProps:{
        'lifePoints': lifePoints,
        'orientacao': orientacaoTela,
        'jogador': jogador
      }
    });
    modal.present();
    
    const {data} = await modal.onWillDismiss();

    if(data.jogador === 'j1'){
      this.lifePoints1 = data.lifePoints;
    }else if(data.jogador === 'j2'){
      this.lifePoints2 = data.lifePoints;
    }

    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

}
