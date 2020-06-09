import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../provider/ygo/database.service';
import { Router, NavigationExtras} from '@angular/router';

interface BanlistCard{
  cardId: any,
  cardName: any,
  cardStatus: any,
  imgPath: any,
  cardType: any
}

@Component({
  selector: 'app-banlist',
  templateUrl: './banlist.page.html',
  styleUrls: ['./banlist.page.scss'],
})

export class BanlistPage implements OnInit {
   banlist: any;
   searchCard: Array<BanlistCard> = [];
   allList:Array<BanlistCard> = [];
   limited:Array<BanlistCard> = [];
   semi:Array<BanlistCard> = [];
   banned:Array<BanlistCard> = [];
   options = [{name: "Todas", checked: true}, {name: "Banidas", checked: false}, {name: "Limitadas", checked: false}, {name: "Semi-Limitadas", checked: false}];
   isSearch = false;
  constructor(private database: DatabaseService, private router: Router) { 
    this.banlist = this.getAllBanData();
    this.organizeCards();
  }


  getAllBanData(){
   return this.database.getAllBanData();
  }

  color(cor){
    console.log(cor);
  }
  
  searchBanCard(event){
    const searchTerm = event.srcElement.value;
    
    if(searchTerm && searchTerm.trim() != ''){
      for(let option of this.options){
          option.checked = false;
        }
      this.isSearch = true;
      this.searchCard = this.allList.filter((item: BanlistCard)=>{
        return (item.cardName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }else{
      this.isSearch = false;
      this.options[0].checked = true;
    }
    
  }
  
  treatString(string: String){
    let cardType;
    
    if(string.indexOf("Fusion") !== -1){
      cardType = string;
    }else if(string.indexOf("Synchro") !== -1){
      cardType = string;
    }else if(string.indexOf("XYZ") !== -1){
      cardType = string;
    }else if(string.indexOf("Effect") !== -1){
      cardType = string;
    }else if(string.indexOf("Normal") !== -1){
      cardType = string;
    }else if(string.indexOf("Ritual") !== -1){
      cardType = string;
    }else if(string.indexOf("Link") !== -1){
      cardType = string;
    }else if(string.indexOf("Spell") !== -1){
      cardType = string;
    }else if(string.indexOf("Trap") !== -1){
      cardType = string;
    }else if(string.indexOf("Tuner") !== -1){
      cardType = string;
    }else if(string.indexOf("Spirit") !== -1){
      cardType = string;
    }else if(string.indexOf("Gemini") !== -1){
      cardType = string;
    }

    return cardType;
  }

  organizeCards(){
    this.banlist.then(response =>{
      for(let card of response){
        let banStatus = card.banlist_info.ban_tcg;
        if(banStatus === "Limited"){         
         this.limited.push({cardId: card.id, cardName: card.name, cardStatus: banStatus, imgPath: card.card_images[0].image_url_small, cardType: this.treatString(card.type)});
        }else if(banStatus === "Semi-Limited"){
          this.semi.push({cardId: card.id, cardName: card.name, cardStatus: banStatus, imgPath: card.card_images[0].image_url_small, cardType: this.treatString(card.type)});
        }else if(banStatus === "Banned"){
          this.banned.push({cardId: card.id, cardName: card.name, cardStatus: banStatus, imgPath: card.card_images[0].image_url_small, cardType: this.treatString(card.type)});
        }
      }
      this.allList = this.limited.concat(this.semi, this.banned);
    })
  }

  goToDetails(name, type){
    let navigationExtras: NavigationExtras={
      state:{
        page: "banlist",
        type: type
      }
    }
    this.router.navigate(['/card-detail/'+name], navigationExtras);
  }

  backToMenu(){
    console.log("voltar");
    this.router.navigate(['/home']);
  }
  
  ngOnInit() {
  }

}
