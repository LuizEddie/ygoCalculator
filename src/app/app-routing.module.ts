import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'duelo', loadChildren: './duelo/duelo.module#DueloPageModule' },
  { path: 'field-center', loadChildren: './duelo/field-center/field-center.module#FieldCenterPageModule' },
  { path: 'classico', loadChildren: './duelo/classico/classico.module#ClassicoPageModule' },
  { path: 'calculadora', loadChildren: './duelo/calculadora/calculadora.module#CalculadoraPageModule' },
  { path: 'banlist', loadChildren: './banlist/banlist.module#BanlistPageModule' },
  { path: 'card-detail/:id', loadChildren: './card-detail/card-detail.module#CardDetailPageModule'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
