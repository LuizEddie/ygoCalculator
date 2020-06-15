import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DatabaseService } from 'src/app/provider/ygo/database.service';
import { HTTP } from '@ionic-native/http/ngx'; 
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { SharedModule } from './shared/shared.module';
import { Network } from '@ionic-native/network/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@NgModule({
  declarations: [AppComponent],
  
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScreenOrientation,
    InAppBrowser,
    DatabaseService,
    HTTP,
    SpeechRecognition,
    SharedModule,
    Network,
    Insomnia
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
