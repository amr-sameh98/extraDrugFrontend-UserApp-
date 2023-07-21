import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserDrugsComponent } from './components/user-drugs/user-drugs.component';
import { UserDrugFormComponent } from './components/user-drug-form/user-drug-form.component';
import { authGuard } from './gaurds/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import { AllUsersDrugsComponent } from './components/all-users-drugs/all-users-drugs.component';
import { DrugRequestComponent } from './components/drug-request/drug-request.component';
import { DrugSearchComponent } from './components/drug-search/drug-search.component';


const routes: Routes = [
  {path : 'register' , component: RegisterComponent },
  {path : 'login' , component: LoginComponent },
  {path : 'allUsersDrugs' , component: AllUsersDrugsComponent ,  canActivate: [authGuard] },
  {path : 'userDrugs' , component: UserDrugsComponent ,  canActivate: [authGuard] },
  {path : 'userDrugForm/:id/edit', component: UserDrugFormComponent ,  canActivate: [authGuard] },
  {path : 'userProfile' , component: UserProfileComponent , canActivate: [authGuard]},
  {path : 'editProfile' , component: EditUserProfileComponent , canActivate: [authGuard]},
  {path : 'drugRequest/:id/:donorId/:drugQuantity', component: DrugRequestComponent ,  canActivate: [authGuard] },
  {path : 'drugSearch', component: DrugSearchComponent ,  canActivate: [authGuard] },







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
