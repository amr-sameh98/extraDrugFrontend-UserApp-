import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/iUser';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.development';
import { Ipassword } from 'src/app/models/ipssword';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit{
  userData = {} as IUser;
  userProfilePicture:string=""
  userID:any
  passwordForm:FormGroup
  editDataForm:FormGroup
  constructor(
    private router:Router,
    private toastr:ToastrService,
    private userOperationsService:UserService,
    private fb: FormBuilder ,
    ){
      
      
      this.editDataForm = fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(11), Validators.maxLength(11)]]
        
      }, );
      this.passwordForm = fb.group({
        OldPassword: ['', [Validators.required]],
        NewPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        
      }, );
    }

    ngOnInit(): void {
  
      this.getUserprofile();
      
    }
    
    //Edit Password
  get OldPassword() {
    return this.passwordForm.get('OldPassword');
  }

  get NewPassword() {
    return this.passwordForm.get('NewPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }
  //Edit profile
  get firstName() {
    return this.editDataForm.get('firstName');
  }

  get lastName() {
    return this.editDataForm.get('lastName');
  }

  get username() {
    return this.editDataForm.get('username');
  }
  get phoneNumber() {
    return this.editDataForm.get('phoneNumber');
  }

  getUserprofile(){
    this.userOperationsService.getUserprofile().subscribe({
    next:(data)=>{ 
      this.userData=data.data;
      this.userProfilePicture=environment.baseURL+data.data.photo;
      this.firstName?.setValue(this.userData.firstName);
      this.lastName?.setValue(this.userData.lastName);
      this.username?.setValue(this.userData.username);
      this.phoneNumber?.setValue(this.userData.phoneNumber);

    },error(err) {
    console.log(err)
    },
  
    })
  }

  submitPass(){

    let passModel:Ipassword=this.passwordForm.value as Ipassword; 
    
    console.log( passModel);

    this.userOperationsService.changePassword(passModel).subscribe({
      next:(data)=>{ 
        this.toastr.success(`${data.message}`,"",{
          disableTimeOut:false,
          titleClass:"toaster_title",
          messageClass:"toaster_message",
          timeOut:5000,
          closeButton:true
        })
        
      console.log(data);
      },error:(error)=>{
      console.log(error?.error);
      this.toastr.error(`${error?.error?.message}`,"",{
        disableTimeOut:false,
        titleClass:"toaster_title",
        messageClass:"toaster_message",
        timeOut:5000,
        closeButton:true
      })
      }
    
      })
  }

  submitProfileData(){
    let profileModel:IUser=this.editDataForm.value as IUser;
    
    console.log(profileModel);
    this.userOperationsService.editUserData(profileModel).subscribe({

      next:(data)=>{ 
        this.toastr.success(`${data.message}`,"",{
          disableTimeOut:false,
          titleClass:"toaster_title",
          messageClass:"toaster_message",
          timeOut:5000,
          closeButton:true
        })
        
      console.log(data);
      },error:(error)=>{
      console.log(error?.error);
      this.toastr.error(`${error?.error?.message}`,"",{
        disableTimeOut:false,
        titleClass:"toaster_title",
        messageClass:"toaster_message",
        timeOut:5000,
        closeButton:true
      })
      }

    });
  }

}
