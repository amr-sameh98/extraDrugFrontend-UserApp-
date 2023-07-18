import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/iUser';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  isloggedSubject: BehaviorSubject<boolean>;
  public redirectUrl: string = '';
  httpOption

  constructor( private router: Router , private httpClient: HttpClient) {
    this.isloggedSubject = new BehaviorSubject<boolean> (this.isUserLogged);
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
   }

  ngOnInit(): void {
    history.pushState(null, '');
  }

  login(email: string, password: string)
  {
    return this.httpClient
    .post<any>("http://localhost:5250/api/auth/login",{email: `${email}` , password: `${password}`} , this.httpOption);
  }

  register(user: IUser)
  {
    return this.httpClient
    .post<any>("http://localhost:5250/api/auth/register", JSON.stringify(user) , this.httpOption);
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    this.isloggedSubject.next(false);
    this.router.navigate(['']);
  }

  get isUserLogged(): boolean
  {
    return  (localStorage.getItem('token'))? true: false
  }

  getloggedStatus(): Observable<boolean>
  {
    return this.isloggedSubject.asObservable();
  }

}
