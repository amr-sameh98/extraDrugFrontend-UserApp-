import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/iUser';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData = {} as IUser;
  userProfilePicture:string="";
  formData : any;
  userNewImage : any
  //@ViewChild('imageForUserProfile') img : any;


  fileName: string='';
  selecetdFile : any;

  constructor(
     private router:Router,
     private toastr:ToastrService,
     private userOperationsService:UserService,
    ) {

  }
  ngOnInit(): void {
    this.getUserprofile();
  }

  editUserData(){
      this.router.navigate(['/editProfile'])
  }
  onFileUpload(event:any){

    this.fileName = event?.target.files[0].name;
    //Creating img
    if (event.target.files && event.target.files[0]) {

    //set image model
    let files = event.srcElement.files
    console.log(files)

    if (!files) {
      return
    }
     this.formData = new FormData();
    for (let i = 0; i <= files.length; i++) {
      this.formData.append("file", files[i] );
    }
    console.log(this.formData);


  }

  }
  OnUploadFile(){
    //console.log(this.selecetdFile)
    this.userOperationsService.uploadUserPhoto(this.formData).subscribe({
      next:(data)=>{
        this.fileName='';
        this.toastr.success(`${data.message}`,"",{
          disableTimeOut:false,
          titleClass:"toaster_title",
          messageClass:"toaster_message",
          timeOut:5000,
          closeButton:true
        })
        this.getUserprofile()
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
  getUserprofile(){
    this.userOperationsService.getUserprofile().subscribe({
    next:(data)=>{
      this.userData=data.data;
      this.userProfilePicture=environment.baseURL+data.data.photo;


    //console.log(this.userData);
    //console.log(this.userProfilePicture);
    //console.log(environment.profilepic);
    },error(err) {
    console.log(err)
    },

    })
  }

}
