import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../provider/ygo/database.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {
  private name: any;
  private cardDetail: any;
  private pageToBack: any;
  constructor(private route: ActivatedRoute, private router: Router, private database: DatabaseService) { 
    this.name = this.getId();
    this.cardDetail = this.getCardDetail();
    this.getPageToBack();
  }

  ngOnInit() {
  }

  getId(){
    return this.route.snapshot.paramMap.get('name');
  }

  getPageToBack(){
    let getNav = this.router.getCurrentNavigation();
    if(getNav.extras.state){
      this.pageToBack = getNav.extras.state.page;
    }
  }

  getCardDetail(){
    return this.database.getSpecificCard(this.name);
  }

  backToPage(){
    if(this.pageToBack === "banlist"){
      this.router.navigate(['/banlist']);
    }
  }

}
