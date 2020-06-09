import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculadoraPage } from '../duelo/calculadora/calculadora.page';
import { FieldCenterPage } from '../duelo/field-center/field-center.page';



@NgModule({
  declarations: [CalculadoraPage, FieldCenterPage],
  imports: [
    CommonModule
  ],
  exports:[
    CalculadoraPage,
    FieldCenterPage
  ]
})
export class SharedModule { }
