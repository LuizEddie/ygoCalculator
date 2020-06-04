import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../provider/ygo/database.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {
  private id: any;
  private cardDetail: any;
  constructor(private route: ActivatedRoute, private router: Router, private database: DatabaseService) { 
    this.id = this.getId();
    this.cardDetail = this.getCardDetail();
    console.log(this.id);
  }

  ngOnInit() {
  }

  getId(){
    return this.route.snapshot.paramMap.get('id');
  }

  getCardDetail(){
    return this.database.getSpecificCard(this.id);
  }

}
