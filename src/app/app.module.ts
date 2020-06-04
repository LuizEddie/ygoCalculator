import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalculadoraPage } from './duelo/calculadora/calculadora.page';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DatabaseService } from 'src/app/provider/ygo/database.service';
import { HTTP } from '@ionic-native/http/ngx'; 

@NgModule({
  declarations: [AppComponent, CalculadoraPage],
  entryComponents: [CalculadoraPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation,
    InAppBrowser,
    DatabaseService,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
