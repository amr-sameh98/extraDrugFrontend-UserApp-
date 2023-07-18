import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/userAuth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLoginForm: FormGroup;
  isUserLogged: boolean = false;
  ifError : boolean = false
  errorMessage: string = ''



  constructor(private fb: FormBuilder , private authService: UserAuthService , private router: Router ) {
    this.userLoginForm = fb.group({
      email: ['', [Validators.required,  ]],
      password: ['', [Validators.required]],
    },);

  }

  ngOnInit(): void {
    this.isUserLogged= this.authService.isUserLogged;
  }

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }

   login()
  {
    this.authService.login(this.email?.value , this.password?.value).subscribe(res=>{
          console.log(res);
          console.log("succes");
          let token = res.data.token ;
          let userId = res.data.userId ;
          let role = res.data.roles[0]
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("userId", userId);



          console.log(token);
          history.pushState(null, '');
          this.authService.isloggedSubject.next(true);
          this.isUserLogged= this.authService.isUserLogged;
          this.router.navigate([this.authService.redirectUrl])
        },err=>{
          console.log(err);
          console.log(err.error.errors[0]);
          this.errorMessage = err.error.errors[0]
          this.ifError = true
        }
    )
  }

}
