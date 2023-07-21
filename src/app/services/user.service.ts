
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { IUser } from '../models/iUser';
import { Ipassword } from '../models/ipssword';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOption

  constructor(private httpClient: HttpClient , private router: Router) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

   }
  ngOnInit(): void {

  }

  getAllUsers() {
    return this.httpClient.get<any>(`${environment.baseURL}/api/user`);
  }

  getUserByID(userId: number) {
    return this.httpClient.get<any>(`${environment.baseURL}/api/user/${userId}`);
  }
  getUserprofile() {
    return this.httpClient.get<any>(`${environment.baseURL}/api/user/profile`);
  }
  changePassword(newpass: Ipassword) {
    return this.httpClient.patch<any>(`${environment.baseURL}/api/user/change-password`, newpass , this.httpOption);
  }
  editUserData(newData: IUser) {
    return this.httpClient.put<any>(`${environment.baseURL}/api/user`, newData , this.httpOption);
  }
  uploadUserPhoto(photo: any) {
    return this.httpClient.patch<any>(`${environment.baseURL}/api/user/photo`, photo );
  }



}
