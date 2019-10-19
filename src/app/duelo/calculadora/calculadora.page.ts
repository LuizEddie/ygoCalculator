import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {

  private lifePoints = "";
  private pontosAlterados = "";
  private pontosMemoria = "";
  private orientacao;
  private jogador;
  constructor(private alertController: AlertController, private modalController: ModalController, 
    private screen: ScreenOrientation, private navParams: NavParams) {
      this.lifePoints = this.navParams.get('lifePoints');
      this.orientacao = this.navParams.get('orientacao');
      this.jogador = this.navParams.get('jogador');
      this.mudarOrientacao();
     }

  apertarBotao(botao){
    this.pontosAlterados = this.pontosAlterados + botao;
  }

  realizarOperacao(){
    try{
      if(this.pontosAlterados.startsWith("+") || this.pontosAlterados.startsWith("-") || this.pontosAlterados.startsWith("*") || this.pontosAlterados.startsWith("/")){
        if(this.pontosAlterados.substring(0,2) === "//"){
          this.pontosAlterados = "/2";
          this.pontosMemoria = this.lifePoints;
          this.lifePoints = eval(this.lifePoints + this.pontosAlterados);
          this.pontosAlterados="";
        }else if(this.pontosAlterados.substring(0,2) === "**"){
          this.pontosAlterados = "*2";
          this.pontosMemoria = this.lifePoints;
          this.lifePoints = eval(this.lifePoints + this.pontosAlterados);
          this.pontosAlterados="";
        }else{
          this.pontosMemoria = this.lifePoints;
          this.lifePoints = eval(this.lifePoints + this.pontosAlterados);
          this.pontosAlterados = "";
        }
        this.fecharModal();
      }else{
        this.alertErro();
      }

    }catch(e){
      this.alertErro();
  }
}

apagar(tipo){
  if(tipo === "C"){
    this.pontosAlterados = "";
  }else if(tipo === "DEL"){
    this.pontosAlterados = this.pontosAlterados.substring(0, this.pontosAlterados.length -1);
  }
}

rebobinar(){
  if(this.pontosMemoria != ""){
    this.lifePoints = this.pontosMemoria;
  }
  
}


 async alertErro(){
    const alert = await this.alertController.create()
      alert.title = "Erro";
      alert.subHeader = "Digite uma operação valida";
      alert.buttons = [
        {
          text:"Ok",
          handler: ()=>{
            this.pontosAlterados = "";
          }
        }
      ]
      alert.present();
    }

  fecharModal(){
    this.modalController.dismiss({
      'lifePoints': this.lifePoints,
      'jogador': this.jogador,
      'pontosMemoria': this.pontosMemoria
    });
  }

  mudarOrientacao(){
    if(this.orientacao === 'normal'){
      this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT_PRIMARY);
    }else if(this.orientacao === 'invertido'){
      this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT_SECONDARY);
    }
  }
 

  ngOnInit() {
  }

}
