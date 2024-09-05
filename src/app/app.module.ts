import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MandateFormComponent } from './mandate-form/mandate-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListMandatComponent } from './list-mandat/list-mandat.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ListChauffeurComponent } from './list-chauffeur/list-chauffeur.component';
import { EditMandatComponent } from './edit-mandat/edit-mandat.component';

@NgModule({
  declarations: [
    AppComponent,
    MandateFormComponent,
    ListMandatComponent,
    NavbarComponent,
    NavbarComponent,
    HomeComponent,
    ListChauffeurComponent,
    EditMandatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
