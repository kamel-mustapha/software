import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ReglagesComponent } from './reglages/reglages.component';
import { TicketComponent } from './reglages/ticket/ticket.component';
import { IndexComponent } from './reglages/index/index.component';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  {
    path: 'settings',
    component: ReglagesComponent,
    children: [
      { path: 'base', component: IndexComponent },
      { path: 'ticket', component: TicketComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
