import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ReglagesComponent } from './reglages/reglages.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'settings', component: ReglagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
