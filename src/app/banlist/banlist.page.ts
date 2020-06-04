import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { DatabaseService } from '../provider/ygo/database.service';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';


@Component({
  selector: 'app-banlist',
  templateUrl: './banlist.page.html',
  styleUrls: ['./banlist.page.scss'],
})

export class BanlistPage implements OnInit {
  private banlist: any;
  constructor(private database: DatabaseService, private router: Router) { 
    //this.banlist = this.getAllBanData();
  }
/*
  getAllBanData(){
   return this.database.getAllBanData();
  }

  getSpecificCard(card){
    return this.database.getSpecificCard(card);
  }
  
  searchBanCard(event){
    const searchTerm = event.srcElement.value;
    if(searchTerm === ""){
      this.banlist = this.getAllBanData();
    }else{
      this.banlist = this.getSpecificCard(searchTerm);
    }
  }

  goToDetails(id){
    console.log(id);
    this.router.navigate(['/card-detail/'+id]);
  }
  
*/

  ngOnInit() {
  }

}
