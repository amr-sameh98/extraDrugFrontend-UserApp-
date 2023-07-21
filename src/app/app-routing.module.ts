import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserDrugsComponent } from './components/user-drugs/user-drugs.component';
import { UserDrugFormComponent } from './components/user-drug-form/user-drug-form.component';
import { authGuard } from './gaurds/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';


const routes: Routes = [
  {path : 'register' , component: RegisterComponent },
  {path : 'login' , component: LoginComponent },
  {path : 'userDrugs' , component: UserDrugsComponent },
  {path : 'userDrugForm/:id/edit', component: UserDrugFormComponent ,  canActivate: [authGuard] },
  {path : 'userProfile' , component: UserProfileComponent , canActivate: [authGuard]},
  {path : 'editProfile' , component: EditUserProfileComponent , canActivate: [authGuard]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
