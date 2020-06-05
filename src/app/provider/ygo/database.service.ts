import { Injectable, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HTTP, private alertController: AlertController) { }

async getAllBanData(){
  var banlist;
 await this.http.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg',{},{}).then(resposta=>{
    this.alertView("Banco de dados carregado");
    resposta.data = JSON.parse(resposta.data);
    banlist = resposta.data.data;
    console.log(banlist);
  }).catch(err=>{
    console.log(err.error);
  })
  return banlist;
}

async getAllCards(){

}

async getSpecificCard(card){
  let foundCard;
  await this.http.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?name='+card+"",{},{}).then(response=>{
    response.data = JSON.parse(response.data);
    foundCard = response.data.data;
  }).catch(err=>{
    console.log(err.error);
  })
  return foundCard;
}

async alertView(message){
  const alert = await this.alertController.create({
    message: message
  });
  alert.buttons =["OK"]

  alert.present();
}

}
