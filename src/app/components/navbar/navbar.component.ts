import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/userAuth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLogged:boolean;
  userRole : any

  constructor(private authService:UserAuthService , private router: Router) {
    this.isUserLogged=this.authService.isUserLogged;
    console.log(this.isUserLogged);

    if(localStorage.getItem("role") == "User") {
      this.userRole = true
    }
   }

  ngOnInit(): void {
    this.authService.getloggedStatus().subscribe(status=>{
      this.isUserLogged=status;
    });

    if(localStorage.getItem("role") == "User") {
      this.userRole = true
    }
    console.log("rolleee");
    console.log(this.userRole);
  }

  logout()
  {
    this.authService.logout();
    this.isUserLogged= this.authService.isUserLogged;
  }

}
