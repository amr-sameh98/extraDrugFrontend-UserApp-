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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    UserDrugsComponent,
    UserDrugFormComponent,
    FooterComponent,
    UserProfileComponent,
    EditUserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
