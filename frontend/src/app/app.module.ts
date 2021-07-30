import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { UsersComponent } from './components/users/users.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';
import { TournamentsShowComponent } from './components/tournaments/tournaments-show/tournaments-show.component';
import { TournamentsDetailComponent } from './components/tournaments/tournaments-detail/tournaments-detail.component';
import { TournamentsAddComponent } from './components/tournaments/tournaments-add/tournaments-add.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TournamentsUpdateComponent } from './components/tournaments/tournaments-update/tournaments-update.component';
import { JwtHelperService, JwtInterceptor, JWT_OPTIONS } from '@auth0/angular-jwt';
import { GoogleMapsModule } from '@angular/google-maps';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    RegisterConfirmComponent,
    TournamentsShowComponent,
    TournamentsDetailComponent,
    TournamentsAddComponent,
    TournamentsUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,


    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    GoogleMapsModule
  ],
  providers: [
    //{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, 
    JwtHelperService, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//'AIzaSyB2EBpfLgknJm7xxBeXbt34cEOCEpt1_P4'