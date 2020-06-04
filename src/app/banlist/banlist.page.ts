import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../provider/ygo/database.service';
import { Router} from '@angular/router';

interface BanlistCard{
  cardId: any,
  cardName: any,
  cardStatus: any
}

@Component({
  selector: 'app-banlist',
  templateUrl: './banlist.page.html',
  styleUrls: ['./banlist.page.scss'],
})

export class BanlistPage implements OnInit {
  private banlist: any;
  private searchCard: Array<BanlistCard> = [];
  private allList:Array<BanlistCard> = [];
  private limited:Array<BanlistCard> = [];
  private semi:Array<BanlistCard> = [];
  private banned:Array<BanlistCard> = [];
  private options = [{name: "Todas", checked: true}, {name: "Banidas", checked: false}, {name: "Limitadas", checked: false}, {name: "Semi-Limitadas", checked: false}];
  private selected;
  constructor(private database: DatabaseService, private router: Router) { 
    this.banlist = this.getAllBanData();
    this.organizeCards();
    this.sortCards(this.options[0].name, this.options[0].checked);
  }

  sortCards(name, check){
    if(check === true){
      this.selected = name;
    }else{
      this.selected = "";
    }
  }
  getAllBanData(){
   return this.database.getAllBanData();
  }

  
  searchBanCard(event){
    const searchTerm = event.srcElement.value;
    
    if(searchTerm && searchTerm.trim() != ''){
      this.selected = "Pesquisa";
      this.searchCard = this.allList.filter((item: BanlistCard)=>{
        return (item.cardName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }else{
      for(let option of this.options){
        if(option.name === "Todas"){
          option.checked = true;
          this.selected = option.name;
        }else{
          option.checked = false;
        }
      }
    }
  }

  organizeCards(){
    this.banlist.then(response =>{
      for(let card of response){
        let banStatus = card.banlist_info.ban_tcg;
        if(banStatus === "Limited"){
         this.limited.push({cardId: card.id, cardName: card.name, cardStatus: banStatus});
        }else if(banStatus === "Semi-Limited"){
          this.semi.push({cardId: card.id, cardName: card.name, cardStatus: banStatus});
        }else if(banStatus === "Banned"){
          this.banned.push({cardId: card.id, cardName: card.name, cardStatus: banStatus});
        }
      }
      this.allList = this.limited.concat(this.semi, this.banned);
    })
  }

  goToDetails(id){
    console.log(id);
    this.router.navigate(['/card-detail/'+id]);
  }
  


  ngOnInit() {
  }

}
