import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component'
import { CoreModule } from './core/core.module';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { UserDrugsComponent } from './components/user-drugs/user-drugs.component';
import { UserDrugFormComponent } from './components/user-drug-form/user-drug-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllUsersDrugsComponent } from './components/all-users-drugs/all-users-drugs.component';
import { DrugRequestComponent } from './components/drug-request/drug-request.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DrugSearchComponent } from './components/drug-search/drug-search.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    UserDrugsComponent,
    UserDrugFormComponent,
    FooterComponent,
    AllUsersDrugsComponent,
    DrugRequestComponent,
    DrugSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
