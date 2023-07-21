import { Component } from '@angular/core';
import { DrugRequestService } from 'src/app/services/drugRequest.service';

@Component({
  selector: 'app-drug-req-as-doner',
  templateUrl: './drug-req-as-doner.component.html',
  styleUrls: ['./drug-req-as-doner.component.css']
})
export class DrugReqAsDonerComponent {
  drugsReqsAsDonerList! : any[]

  constructor(private drugRequestService : DrugRequestService) {
  }

  ngOnInit(): void {
    this.drugRequestService.getRequestsAsDrugDoner().subscribe((data) => {
      console.log(data);
      this.drugsReqsAsDonerList = data.data
      for (let i = 0; i < this.drugsReqsAsDonerList.length; i++) {
        for (let j = 0; j < this.drugsReqsAsDonerList[i].requestItems.length; j++) {
      this.drugsReqsAsDonerList[i].requestItems[j].userDrug.expireDate =  this.drugsReqsAsDonerList[i].requestItems[j].userDrug.expireDate.slice(0,10)
      this.drugsReqsAsDonerList[i].createdAt =   this.drugsReqsAsDonerList[i].createdAt.slice(0,10)
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

  acceptReq(reqId : number) {
    this.drugRequestService.acceptRequest(reqId).subscribe((data) => {
      console.log(data);
      this.ngOnInit()


    })
  }

}
