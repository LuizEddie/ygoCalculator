import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DueloPage } from './duelo.page';
import { ClassicoPage } from './classico/classico.page';
import { FieldCenterPage } from './field-center/field-center.page';
import { CalculadoraPage } from './calculadora/calculadora.page';

import { SharedModule } from '../shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: DueloPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [DueloPage]
})
export class DueloPageModule {}
