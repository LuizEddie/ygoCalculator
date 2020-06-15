import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { DatabaseService, CardData } from '../provider/ygo/database.service';
import { AlertController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

const { AdMob } = Plugins;


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.page.html',
  styleUrls: ['./card-list.page.scss'],
})
export class CardListPage implements OnInit {

  cardsData: CardData = {cards: "", meta: ""};
  options = [{name: "", label: "Todos os cards", value: "", isChecked: true, type: "radio" as "radio"},
    {name:"effect monster", label: "Monstros Efeito", value: "&type=effect monster", isChecked: false, type: "radio" as "radio"},
    {name:"flip effect monster", label: "Monstros Efeito Flip", value: "&type=flip effect monster", isChecked: false, type: "radio" as "radio"},
    {name:"flip tuner effect monster", label: "Monstros Efeito Tuner Flip", value: "&type=flip tuner effect monster", isChecked: false, type: "radio" as "radio"},
    {name:"gemini monster", label: "Monstros Gemini", value: "&type=gemini monster", isChecked: false, type: "radio" as "radio"},
    {name:"normal monster", label: "Monstros Normais", value: "&type=normal monster", isChecked: false, type: "radio" as "radio"},
    {name:"normal tuner monster", label: "Monstros Normais Tuner", value: "&type=normal tuner monster", isChecked: false, type: "radio" as "radio"},
    {name:"pendulum effect monster", label: "Monstros Pendulo Efeito", value: "&type=pendulum effect monster", isChecked: false, type: "radio" as "radio"},
    {name:"pendulum flip effect monster", label: "Monstros Pendulo Efeito Flip", value: "&type=pendulum flip effect monster", isChecked: false, type: "radio" as "radio"},
    {name:"pendulum normal monster", label: "Monstros Pendulo Normais", value: "&type=pendulum normal monster", isChecked: false, type: "radio" as "radio"},
    {name:"pendulum tuner effect monster", label: "Monstros Pendulo Efeito Tuner", value: "&type=pendulum tuner effect monster", isChecked: false, type: "radio" as "radio"},
    {name:"ritual effect monster", label: "Monstros Efeito Ritual", value: "&type=ritual effect monster", isChecked: false, type: "radio" as "radio"},
    {name:"spirit monster", label: "Monstros Espirito", value: "&type=spirit monster", isChecked: false, type: "radio" as "radio"},
    {name:"toon monster", label: "Monstros Mundo da Fantasia", value: "&type=toon monster", isChecked: false, type: "radio" as "radio"},
    {name:"tuner monster", label: "Monstros Tuner", value: "&type=tuner monster", isChecked: false, type: "radio" as "radio"},
    {name:"union effect monster", label: "Monstros Efeito União", value: "&type=union effect monster", isChecked: false, type: "radio" as "radio"},
    {name:"skill card", label: "Skill", value: "&type=skill card", isChecked: false, type: "radio" as "radio"},
    {name:"spell card", label: "Magicas", value: "&type=spell card", isChecked: false, type: "radio" as "radio"},
    {name:"trap card",  label: "Armadilhas", value: "&type=trap card", isChecked: false, type: "radio" as "radio"},
    {name:"fusion monster", label: "Monstros Fusão", value: "&type=fusion monster", isChecked: false, type: "radio" as "radio"},
    {name:"link monster", label: "Monstros Link", value: "&type=link monster", isChecked: false, type: "radio" as "radio"},
    {name:"pendulum effect fusion monster", label: "Monstros Pendulo Fusão", value: "&type=pendulum effect fusion monster", isChecked: false, type: "radio" as "radio"},
    {name:"synchro monster", label: "Monstros Synchro", value: "&type=synchro monster", isChecked: false, type: "radio" as "radio"},
    {name:"synchro pendulum effect monster", label: "Monstros Pendulo Synchro", value: "&type=synchro pendulum effect monster", isChecked: false, type: "radio" as "radio"},
    {name:"synchro tuner monster", label: "Monstros Synchro Tuner", value: "&type=synchro tuner monster", isChecked: false, type: "radio" as "radio"},
    {name:"xyz monster", label: "Monstros XYZ", value: "&type=xyz monster", isChecked: false, type: "radio" as "radio"},
    {name:"xyz pendulum effect monster", label: "Monstros Pendulo XYZ", value: "&type=xyz pendulum effect monster", isChecked: false, type: "radio" as "radio"}];
  isSearch: Boolean = false;
  sortOptions = [{name:"Ascendente", isChecked: true, value: "asc"}, {name: "Descendente", isChecked: false, value: "desc"}];
  selectedSortValue = "asc";
  selectedFilterValue = "";
  constructor(private router: Router, private database: DatabaseService, private alertController: AlertController, private speech: SpeechRecognition) { 
    this.getAllCards(0, this.selectedSortValue, this.selectedFilterValue);
  }

  ngOnInit() {
  }

  getCheckedOption(){
    let checked;
    for (let option of this.sortOptions){
      if(option.isChecked === true){
        checked = option.value
        break;
      }
    }
    return checked;
  }

  backToMenu(){
    this.router.navigate(['/home']);
    this.resumeBanner();
  }

  resumeBanner(){
    AdMob.resumeBanner();
  }

  getAllCards(offset, order, filter){
    this.database.getAllCards(offset, order, filter).then((response)=>{
      this.cardsData = {cards: response.cards, meta: response.meta};
    });
    
  }

  getSpecificCard(cardName){
    this.database.getSpecificCard(cardName).then((response)=>{
      this.cardsData = {cards: response.cards, meta: response.meta};
    })
  }

  nextPage(){
    if(this.cardsData.meta.pages_remaining > 0){
      var nextPage = this.cardsData.meta.next_page_offset
      this.getAllCards(nextPage, this.selectedSortValue, this.selectedFilterValue);
    }
  }

  previousPage(){
    if(this.cardsData.meta.total_pages !== this.cardsData.meta.pages_remaining){
      var previousPage = this.cardsData.meta.previous_page_offset;
      this.getAllCards(previousPage, this.selectedSortValue, this.selectedFilterValue);
    }
  }

  lastPage(){
    if(this.cardsData.meta.pages_remaining > 0){
      var lastPage = this.cardsData.meta.total_rows - 100;
      this.getAllCards(lastPage,  this.selectedSortValue, this.selectedFilterValue);
    }
  }

  firstPage(){
    if(this.cardsData.meta.total_pages !== this.cardsData.meta.pages_remaining){
      this.getAllCards(0, this.selectedSortValue, this.selectedFilterValue);
    }
  }

  searchCard(evt){
    const search = evt.srcElement.value;

    console.log(search);
    if(search && search.trim() !== ''){
      this.isSearch = true;
      this.getSpecificCard(search);      
    }else{
      this.getAllCards(0, this.selectedSortValue, this.selectedFilterValue);
      this.isSearch = false;
    }
  }

  async filterCard(){
    let alert = await this.alertController.create();
    alert.title = "Filtro";
    alert.message = "Escolha o tipo de card para o filtro";
    alert.inputs = this.options;
    alert.buttons = [{text: "Filtrar",
      handler: (data)=>{
        this.selectedFilterValue = data;
        this.getAllCards(0, this.selectedSortValue, this.selectedFilterValue);
      }
    },{text: "Cancelar", role: 'cancel'}];
    
    await alert.present();
  }

  sortCards(sort){
    this.selectedSortValue = sort;
    this.getAllCards(0, this.selectedSortValue, this.selectedFilterValue);
  }

  goToDetails(name){
    let extras: NavigationExtras = {
      state:{
        page: "card-list"
      }
    }
    this.router.navigate(['/card-detail/'+name], extras);
  }

}
