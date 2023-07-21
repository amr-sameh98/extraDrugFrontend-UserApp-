import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserDrugsComponent } from './components/user-drugs/user-drugs.component';
import { UserDrugFormComponent } from './components/user-drug-form/user-drug-form.component';
import { authGuard } from './gaurds/auth.guard';
import { AllUsersDrugsComponent } from './components/all-users-drugs/all-users-drugs.component';
import { DrugRequestComponent } from './components/drug-request/drug-request.component';
import { DrugSearchComponent } from './components/drug-search/drug-search.component';
import { DrugReqAsRecieverComponent } from './components/drug-req-as-reciever/drug-req-as-reciever.component';
import { DrugReqAsDonerComponent } from './components/drug-req-as-doner/drug-req-as-doner.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { loginGuard } from './gaurds/login.guard';


const routes: Routes = [
  {path : '', component: HomeComponent },
  {path : 'contact', component: ContactComponent },
  {path : 'search', component: DrugSearchComponent ,  canActivate: [authGuard] },
  {path : 'register' , component: RegisterComponent ,  canActivate: [loginGuard] },
  {path : 'login' , component: LoginComponent , canActivate: [loginGuard] },
  {path : 'allUsersDrugs' , component: AllUsersDrugsComponent ,  canActivate: [authGuard] },
  {path : 'drugReqAsReciever' , component: DrugReqAsRecieverComponent ,  canActivate: [authGuard] },
  {path : 'drugReqAsDoner' , component: DrugReqAsDonerComponent ,  canActivate: [authGuard] },
  {path : 'userDrugs' , component: UserDrugsComponent ,  canActivate: [authGuard] },
  {path : 'userDrugForm/:id/edit', component: UserDrugFormComponent ,  canActivate: [authGuard] },
  {path : 'drugRequest/:id/:donorId/:drugQuantity', component: DrugRequestComponent ,  canActivate: [authGuard] },








];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
