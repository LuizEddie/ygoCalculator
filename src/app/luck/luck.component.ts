import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NavParams, ModalController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-luck',
  templateUrl: './luck.component.html',
  styleUrls: ['./luck.component.scss'],
})
export class LuckComponent implements OnInit {

  option: any;
  result;
  constructor(private screen: ScreenOrientation, private navParams: NavParams, private modalController: ModalController) {
    this.option = this.navParams.get("type");
    this.toss(this.option);
   }

  ngOnInit() {
  }

  caraOuCoroa(){
    let min = Math.ceil(1);
    let max = Math.floor(2);
    let valor = Math.floor(Math.random() * (max - min + 1)) + min;
    return (valor === 1) ? "Cara" : "Coroa";
    /*if(valor === 1){
      return "Cara";
    }else{
      return "Coroa";
    }*/
  }

  dados(){
    let min = Math.ceil(1);
    let max = Math.ceil(6);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toss(option){
    var count = 10;
    setInterval(()=>{

      if(count > 0){
        this.result = option === "Cara ou Coroa"? this.caraOuCoroa() : this.dados();
        /*
        if(option === "Cara ou Coroa"){
          this.result = this.caraOuCoroa();
        }else if(option === "Dados"){
          this.result = this.dados();
        }*/
        count = --count;
      }
    }, 150);
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
