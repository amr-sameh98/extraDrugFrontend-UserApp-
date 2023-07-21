import { DrugRequestService } from './../../services/drugRequest.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDrugRequest } from 'src/app/models/iDrugRequest';

@Component({
  selector: 'app-drug-request',
  templateUrl: './drug-request.component.html',
  styleUrls: ['./drug-request.component.css']
})
export class DrugRequestComponent implements OnInit {
  drugRequestForm: FormGroup;
  httpOption
  userDrugId : any
  donorId : any
  drugQuantity: any
  drugQuantityNotValid : boolean = false
  drugRequestModel: IDrugRequest = {
    "DonorId" : "" ,
    "RequestItems" : [{
      "UserDrugId" : 0 ,
      "Quantity" : 0
    }
  ]
  } ;



  constructor(private fb: FormBuilder ,
    private router: Router ,
    private activatedRoute: ActivatedRoute,
    private httpClient : HttpClient ,
    private drugRequestService: DrugRequestService) {
    this.drugRequestForm = fb.group({
      quantity: ['', [Validators.required , Validators.pattern('[0-9]{1,}')]],
      // coordsLongitude: ['', ],
      // coordsLatitude: ['' , ],
    },);
    this.httpOption = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
  }
  ngOnInit(): void {
    console.log("drug request");
    this.userDrugId = this.activatedRoute.snapshot.paramMap.get('id');
    this.donorId = this.activatedRoute.snapshot.paramMap.get('donorId');
    this.drugQuantity = this.activatedRoute.snapshot.paramMap.get('drugQuantity');


    console.log(this.userDrugId);
    console.log(this.donorId);
  }

  get quantity() {
    return this.drugRequestForm.get('quantity');
  }

  submit() {



    this.drugRequestModel.DonorId = this.donorId
    this.drugRequestModel.RequestItems[0].Quantity = this.quantity?.value
    this.drugRequestModel.RequestItems[0].UserDrugId = this.userDrugId
    this.drugRequestModel.RequestItems[0].Quantity = Number(this.drugRequestModel.RequestItems[0].Quantity)
    this.drugRequestModel.RequestItems[0].UserDrugId = Number(this.drugRequestModel.RequestItems[0].UserDrugId)
    console.log(this.drugRequestModel);

    if(this.drugRequestModel.RequestItems[0].Quantity <= this.drugQuantity) {
      this.drugRequestService.addDrugRequest(this.drugRequestModel).subscribe((data) => {
        console.log(data);
        this.router.navigate(['drugReqAsReciever'])

      })
    }
    else {
      console.log("errrorr");
      this.drugQuantityNotValid = true

    }




  }
}
