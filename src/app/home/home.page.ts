import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  year: any;
  constructor(private alertController: AlertController, private router: Router) {
    this.year = this.getYear();
  }

  async tipoDuelo(){
   const alert = await this.alertController.create();
   
   alert.title = "Formato";
   alert.subHeader = "Escolha o formato do duelo";
   alert.buttons = [{
     text: "Classico",
     handler: ()=>{
      let navigationExtras: NavigationExtras = {
        state: {
          tipo: "dueloClassico",
          layout: "fieldCenter"
        }
      }
      this.router.navigate(['/duelo'], navigationExtras);
     }
   },{
     text: "Speed",
     handler: ()=>{
       let navigationExtras: NavigationExtras = {
         state:{
           tipo: "speedDuel",
           layout: "fieldCenter"
         }
       }
       this.router.navigate(['/duelo'], navigationExtras);
    }
   }]
   alert.present();
  }

  openBanlist(){
    this.router.navigate(['/banlist'])
  }

  openCardList(){


  }

  getYear(){
    var data = new Date();
    return data.getFullYear();
  }

  checkConnection(){

  }

  getAD(){
    
  }

}

