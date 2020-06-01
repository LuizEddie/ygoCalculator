import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-banlist',
  templateUrl: './banlist.page.html',
  styleUrls: ['./banlist.page.scss'],
})

export class BanlistPage implements OnInit {
  options: InAppBrowserOptions ={
    location: 'no',
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',
    hardwareback: 'yes',
    shouldPauseOnSuspend: 'no'
  };
  constructor(private iab: InAppBrowser) { 
    this.renderBrowser();
  }

  renderBrowser(){
    this.iab.create('https://www.yugioh-card.com/en/limited/', "_self", this.options);    
  }
  
  ngOnInit() {
  }

}
