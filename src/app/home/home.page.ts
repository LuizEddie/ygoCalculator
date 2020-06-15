import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Network} from '@ionic-native/network/ngx';
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition} from 'capacitor-admob';

const { AdMob } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  year: any;
  constructor(private alertController: AlertController, private router: Router, private network: Network) {
    this.year = this.getYear();
  }

  ngOnInit(){
    this.showBottomBanner();
    //this.showTopBanner();

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
      this.hideBanner();
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
       this.hideBanner();
    }
   }]
   alert.present();
  }

  openBanlist(){
    let connection = this.checkConnection();

    connection === "Conectado" ? this.router.navigate(['/banlist']) && this.hideBanner() : alert("Necessário internet para usar essa função!");
  }

  openCardList(){
    let connection = this.checkConnection();

    connection === "Conectado" ? this.router.navigate(['/card-list']) && this.hideBanner() : alert("Necessário internet para usar essa função!");

  }

  getYear(){
    var data = new Date();
    return data.getFullYear();
  }

  checkConnection(){
    let netState = this.network.type;

    let con = netState !== 'none' ? "Conectado" : "Desconectado";
    
    return con;
  }

  async showBottomBanner(){
    let options: AdOptions = {
      adId: "ca-app-pub-3940256099942544/6300978111",
      adSize: AdSize.SMART_BANNER,
      position: AdPosition.BOTTOM_CENTER,
      hasTabBar: true
    } 

    await AdMob.showBanner(options).then(value=>{
      console.log(value);
    }, error => {
      console.log(error);
    });
  }

  async showTopBanner(){
    let options: AdOptions = {
      adId: "ca-app-pub-3940256099942544/6300978111",
      adSize: AdSize.SMART_BANNER,
      position: AdPosition.TOP_CENTER,
    }
      await AdMob.showBanner(options).then((value)=>{
        console.log(value);
      }, error=>{
        console.log(error);
      })
  }

  hideBanner(){
    AdMob.hideBanner();
  }

}



