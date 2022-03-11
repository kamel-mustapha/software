import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { DateComponent } from './acceuil/date/date.component';
import { PriceComponent } from './acceuil/price/price.component';
import { ProductsComponent } from './acceuil/products/products.component';
import { ClientsComponent } from './acceuil/clients/clients.component';
import { ConfirmComponent } from './acceuil/confirm/confirm.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReglagesComponent } from './reglages/reglages.component';
import { CaissesComponent } from './acceuil/caisses/caisses.component';
import { SharedService } from './acceuil/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './acceuil/http.service';

@NgModule({
  declarations: [AppComponent, AcceuilComponent, DateComponent, PriceComponent, ProductsComponent, ClientsComponent, ConfirmComponent, ReglagesComponent, CaissesComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule, HttpClientModule],
  providers: [SharedService, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
