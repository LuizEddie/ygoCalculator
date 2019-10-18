import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FieldCenterPage } from './field-center.page';
import { CalculadoraPage } from '../calculadora/calculadora.page';

const routes: Routes = [
  {
    path: '',
    component: FieldCenterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FieldCenterPage, CalculadoraPage]
})
export class FieldCenterPageModule {}
