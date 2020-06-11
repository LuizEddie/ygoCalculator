import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculadoraPage } from '../duelo/calculadora/calculadora.page';
import { FieldCenterPage } from '../duelo/field-center/field-center.page';
import { IonicModule } from '@ionic/angular';
import { LuckComponent } from '../luck/luck.component';


@NgModule({
  declarations: [CalculadoraPage, FieldCenterPage, LuckComponent],
  entryComponents:[CalculadoraPage, LuckComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
    CalculadoraPage,
    FieldCenterPage
  ]
})
export class SharedModule { }
