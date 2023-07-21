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

  getRequestsAsDrugReciever() {
    return this.httpClient.get<any>("http://localhost:5250/api/user/requests/as_reciever" , this.httpOption);
  }

  getRequestsAsDrugDoner() {
    return this.httpClient.get<any>("http://localhost:5250/api/user/requests/as_donor" , this.httpOption);
  }




  cancelRequest(reqId : number) {
    return this.httpClient.patch(`http://localhost:5250/api/user/requests/${reqId}/cancel` , this.httpOption)
  }

  acceptRequest(reqId : number) {
    return this.httpClient.patch(`http://localhost:5250/api/user/requests/${reqId}/accept` , this.httpOption)
  }

  RecieveRequest(reqId : number) {
    return this.httpClient.patch(`http://localhost:5250/api/user/requests/${reqId}/recieve` , this.httpOption)
  }


}
