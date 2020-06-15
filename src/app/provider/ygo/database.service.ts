import { Injectable, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';

export interface CardData{
  cards: any,
  meta: any
}

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

async getAllCards(offset, order, filter){
  var cardsData: CardData;
  await this.http.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?num=100&offset="+offset+"&misc=yes&sort=name&sortorder="+order+filter, {}, {}).then(response=>{
    this.alertView("Banco de dados carregado");
    response.data = JSON.parse(response.data);
    cardsData = {cards: response.data.data, meta: response.data.meta};
    console.log(cardsData.cards);
  }).catch(err=>{
    console.log(err.error);
  })
  return cardsData;
}

async getSpecificCard(card){
  let foundCard: CardData;
  await this.http.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?fname="+card+"&misc=yes&sort=name&sortorder=asc&num=5&offset=0",{},{}).then(response=>{
    response.data = JSON.parse(response.data);
    foundCard = {cards: response.data.data, meta: response.data.meta};
    console.log(foundCard);
  }).catch(err=>{
    console.log(err.error);
  })
  return foundCard;
}

async getCardData(card){
  let foundCard;
  await this.http.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?name="+card+"&misc=yes",{},{}).then(response=>{
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
