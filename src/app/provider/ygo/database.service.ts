import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HTTP) { }
/*
async getAllBanData(){
  var banlist;
 await this.http.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg',{},{}).then(resposta=>{
    alert("Banco de dados carregado");
    resposta.data = JSON.parse(resposta.data);
    banlist = resposta.data.data;
    console.log(banlist);
  }).catch(err=>{
    console.log(err.error);
    alert("erro")
  })
  return banlist;
}

async getSpecificBanCard(card){
  var carta;
  await this.http.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&fname=" + card + "",{},{}).then(resposta=>{
    resposta.data = JSON.parse(resposta.data);
    carta = resposta.data.data;
    console.log(carta);
  }).catch(err =>{
    console.log(err.error);
    alert("erro");
  })
  return carta;
}
*/
async getLatestBanList(){
  var banDate;

  await this.http.get("https://www.ygohub.com/api/all_banlists",{},{}).then(response =>{
    response.data = JSON.parse(response.data);
    
    for(let banData of response.data.banlists){
      console.log(banData);
    }
  }).catch(err=>{
    console.log(err);
  })
}

async getAllBanData(){

}

async getSpecificCard(card){

}

async getAllCards(){

}
}
