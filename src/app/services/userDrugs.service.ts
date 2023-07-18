import { IUserDrug } from '../models/iUserDrug';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDrugsService {
  httpOption

  constructor(private httpClient: HttpClient , private router: Router) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  addNewUserDrug(newDrug : IUserDrug) {
  return this.httpClient.post<any>("http://localhost:5250/api/user/drugs", newDrug , this.httpOption);
  }

  editUserDrug(drugId: number , drug: IUserDrug) {
    return this.httpClient.put<any>(`http://localhost:5250/api/user/drugs/${drugId}` , JSON.stringify(drug) , this.httpOption);
  }

  getUserDrugById(userDrugId : any) {
    return this.httpClient.get<any>(`http://localhost:5250/api/user/Drugs/${userDrugId}` , this.httpOption);

  }

  deleteUserDrug(drugId: number) {
    return this.httpClient.delete<any>(`http://localhost:5250/api/user/drugs/${drugId}`, this.httpOption);
  }

  addPhotoToUserDrug(drugId : any , userDrugImage : any) {
    return this.httpClient.post<any>(`http://localhost:5250/api/user/drugs/${drugId}/photos/`, userDrugImage );

  }

}


