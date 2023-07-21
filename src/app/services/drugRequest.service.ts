import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IDrugRequest } from '../models/iDrugRequest';

@Injectable({
  providedIn: 'root'
})
export class DrugRequestService {
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

  addDrugRequest(drugData : IDrugRequest) {
    return this.httpClient.post<IDrugRequest>("http://localhost:5250/api/user/requests" , JSON.stringify(drugData) , this.httpOption);
  }

}
