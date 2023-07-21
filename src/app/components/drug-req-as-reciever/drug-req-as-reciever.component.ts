import { DrugRequestService } from './../../services/drugRequest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drug-req-as-reciever',
  templateUrl: './drug-req-as-reciever.component.html',
  styleUrls: ['./drug-req-as-reciever.component.css']
})
export class DrugReqAsRecieverComponent implements OnInit {
  drugsReqsAsRecieverList! : any[]

  constructor(private drugRequestService : DrugRequestService) {
  }

  ngOnInit(): void {
    this.drugRequestService.getRequestsAsDrugReciever().subscribe((data) => {
      console.log(data);
      this.drugsReqsAsRecieverList = data.data
      for (let i = 0; i < this.drugsReqsAsRecieverList.length; i++) {
        for (let j = 0; j < this.drugsReqsAsRecieverList[i].requestItems.length; j++) {
      this.drugsReqsAsRecieverList[i].requestItems[j].userDrug.expireDate =  this.drugsReqsAsRecieverList[i].requestItems[j].userDrug.expireDate.slice(0,10)
      this.drugsReqsAsRecieverList[i].createdAt =   this.drugsReqsAsRecieverList[i].createdAt.slice(0,10)
        }
      }
    })
  }

  cancelReq(reqId : number) {
    this.drugRequestService.cancelRequest(reqId).subscribe((data) => {
      console.log(data);
      this.ngOnInit()

    })
  }

  recieveReq(reqId : number) {
    this.drugRequestService.RecieveRequest(reqId).subscribe((data) => {
      console.log(data);
      this.ngOnInit()


    })
  }



}
