
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserDrug } from '../models/iUserDrug';

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
    return this.httpClient.get<any>("http://localhost:5250/api/user");
  }

  getUserByID(userId: number) {
    return this.httpClient.get<any>(`http://localhost:5250/api/user/${userId}`);
  }

  // editUserDrug(drugId: number , drug: IUserDrug) {
  //   return this.httpClient.put<any>(`http://localhost:5250/api/user/drugs/${drugId}` , JSON.stringify(drug) , this.httpOption);
  // }

  // addNewUserDrug(newDrug : IUserDrug) {
  //   return this.httpClient.post<IUserDrug>("http://localhost:5250/api/user/drugs", newDrug , this.httpOption);
  // }

  // deleteUserDrug(drugId: number) {
  //   return this.httpClient.delete<IUserDrug>(`http://localhost:5250/api/user/drugs/${drugId}`, this.httpOption);
  // }


}
