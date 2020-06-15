import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../provider/ygo/database.service';
import { NavParams } from '@ionic/angular';

interface cardSetDetails{
  setId: any,
  setRarity: any
}

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {
   name: any;
   cardDetail: any;
   pageToBack: any;
   showPrice = false;
   priceTitle = "Mostrar preços";
   showSetDetail = false;
   card_Set: cardSetDetails;
  constructor(private route: ActivatedRoute, private router: Router, private database: DatabaseService) { 
    this.name = this.getName();
    this.cardDetail = this.getCardDetail();
    this.getPageToBackData();
  }

  ngOnInit() {
  }

  getName(){
    return this.route.snapshot.paramMap.get('name');
  }

  getPageToBackData(){
    let getNav = this.router.getCurrentNavigation();
    if(getNav.extras.state){
      this.pageToBack = getNav.extras.state.page;
    }
  }

  getCardDetail(){
    return this.database.getCardData(this.name);
  }

  backToPage(){
    if(this.pageToBack === "banlist"){
      this.router.navigate(['/banlist']);
    }else{
      this.router.navigate(['/card-list']);
    }
  }

  showPrices(){
    if(this.showPrice === true){
      this.showPrice = false;
      this.priceTitle = "Mostrar preços";
    }else{
      this.showPrice = true;
      this.priceTitle = "Ocultar preços";
    }

  }

  
  showSetDetails(setId, setRarity){
    this.card_Set = {setId, setRarity};
    if(this.showSetDetail === true){
      this.showSetDetail = false;
    }else{
      this.showSetDetail = true;
    }
  }
}
