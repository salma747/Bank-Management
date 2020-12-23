import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ClientListComponent } from './components/client-list/client-list.component';
import { CompteListComponent } from './components/compte-list/compte-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material.module';
import {AddCompteComponent} from './components/add-compte/add-compte.component';
import {AddClientComponent} from './components/add-client/add-client.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { EditCompteComponent } from './components/edit-compte/edit-compte.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    CompteListComponent,
    AddCompteComponent,
    AddClientComponent,
    NavbarComponent,
    HomeComponent,
    EditCompteComponent,
    EditClientComponent,
    ClientDetailsComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
