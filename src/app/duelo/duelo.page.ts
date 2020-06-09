import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duelo',
  templateUrl: './duelo.page.html',
  styleUrls: ['./duelo.page.scss'],
})
export class DueloPage implements OnInit {

  layout;
  constructor(private router: Router) { 
    this.getLayoutDuelo();
  }

  ngOnInit() {
  }

  getLayoutDuelo(){
    let getNav = this.router.getCurrentNavigation();
    if(getNav.extras.state){
      this.layout = getNav.extras.state.layout;
    }
  }


}
