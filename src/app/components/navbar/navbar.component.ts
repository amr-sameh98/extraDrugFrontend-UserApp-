import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/userAuth.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLogged:boolean;
  userProfilePicture:string='';
  userRole : any

  constructor(private authService:UserAuthService ,
    private userOperationsService:UserService,
    private router: Router) {
    this.isUserLogged=this.authService.isUserLogged;
    console.log(this.isUserLogged);

    if(localStorage.getItem("role") == "User") {
      this.userRole = true
    }
   }

  ngOnInit(): void {
    this.authService.getloggedStatus().subscribe(status=>{
      this.isUserLogged=status;
      this.getUserProfilePicture();
    });

    if(localStorage.getItem("role") == "User") {
      this.userRole = true
    }
    console.log("rolleee");
    console.log(this.userRole);
  }
  getUserProfilePicture(){
    ///getting profile picture
    this.userOperationsService.getUserprofile().subscribe({
      next:(res)=>{
      this.userProfilePicture=environment.baseURL+res.data.photo;
      
      }
    })
  }

  logout()
  {
    this.authService.logout();
    this.isUserLogged= this.authService.isUserLogged;
  }

}
