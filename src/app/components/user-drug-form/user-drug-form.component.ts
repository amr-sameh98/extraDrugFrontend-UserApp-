import { UserDrugsService } from './../../services/userDrugs.service';
import { UserService } from './../../services/user.service';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserDrug } from 'src/app/models/iUserDrug';
import { DrugsService } from 'src/app/services/drugs.service';
import { Idrug } from 'src/app/models/idrug';



@Component({
  selector: 'app-user-drug-form',
  templateUrl: './user-drug-form.component.html',
  styleUrls: ['./user-drug-form.component.css']
})
export class UserDrugFormComponent {
  userDrugForm: FormGroup;
  drugsList: Idrug[] = []
  isGetLocation : boolean = false
  httpOption;
  userDrugId: any;
  drug: any
  userDrugImage : any
  formData : any
  @ViewChild('imageForUserDrug') img : any;

  constructor(private fb: FormBuilder ,
    private router: Router ,
    private activatedRoute: ActivatedRoute,
    private drugsService: DrugsService,
    private userDrugsService : UserDrugsService
    ) {
    this.userDrugForm = fb.group({
      drugId: ['', [Validators.required]],
      expireDate: ['', [Validators.required]],
      quantity: ['', [Validators.required , , Validators.pattern('[0-9]{1,}')]],
      drugPhoto: ['', ],
      coordsLongitude: ['', ],
      coordsLatitude: ['' , ],
    }, );
    this.httpOption = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      })
    };
   }

  ngOnInit(): void {
    this.userDrugId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.userDrugId != 0) {
      this.userDrugsService.getUserDrugById(this.userDrugId).subscribe({
        next: (response) => {
          console.log(response);
          this.drug = response.data;
          this.drugId?.setValue(this.drug.id);
          this.expireDate?.setValue(this.formateDateToInputValidValue(this.drug.expireDate))
          this.quantity?.setValue(this.drug.quantity);
          this.coordsLongitude?.setValue(this.drug.coordsLongitude);
          this.coordsLatitude?.setValue(this.drug.coordsLatitude);
        },
      });
    }

    this.drugsService.getAllDrugs().subscribe((data) => {
      this.drugsList = data.data
      console.log(this.drugsList);

    })
  }

  formateDateToInputValidValue(dateStringFromBackEnd : any) {
    var date = new Date(dateStringFromBackEnd);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + (month) + "-" + (day);
}

   get drugId() {
    return this.userDrugForm.get('drugId');
  }

  get expireDate() {
    return this.userDrugForm.get('expireDate');
  }

  get quantity() {
    return this.userDrugForm.get('quantity');
  }

  get drugPhoto() {
    return this.userDrugForm.get('drugPhoto');
  }

  set drugPhoto(value: any) {
    this.drugPhoto.value = value;
}

  get coordsLongitude() {
    return this.userDrugForm.get('coordsLongitude');
  }

  set coordsLongitude(value: any) {
    this.coordsLongitude.value = value;
}

  get coordsLatitude() {
    return this.userDrugForm.get('coordsLatitude');
  }

  set coordsLatitude(value: any) {
    this.coordsLatitude.value = value;
}


onImageChange(event: any) {
  if (event.target.files && event.target.files[0]) {
    //image to show on upload
    let img = event.target.files[0];
    this.userDrugImage = URL.createObjectURL(img)
    this.img.nativeElement.style.display = "block"
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // reader.addEventListener("load", () => {
    //   // localStorage.setItem("recent-image", reader.result);
    // });
    
    let files = event.srcElement.files
    if (!files) {
      return
    }
     this.formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      this.formData.append("file", files[i] );
    }
  }
}

  getLocation()
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordsLongitude = position.coords.longitude;
        this.coordsLatitude =  position.coords.latitude;
        console.log(this.coordsLongitude.value);
        console.log(this.coordsLatitude.value);
        this.isGetLocation = true
        console.log(this.isGetLocation);
      }, err => console.error("have not permission"));
    } else {
      console.log("No support for geolocation")
    }
  }

  submit() {
    let userDrugModel: IUserDrug = this.userDrugForm.value as IUserDrug;
    userDrugModel.drugId = Number(this.drugId?.value)
    userDrugModel.coordsLatitude = this.coordsLatitude.value
    userDrugModel.coordsLongitude = this.coordsLongitude.value
    console.log(userDrugModel);

    if (this.userDrugForm.status == 'VALID') {
      if (this.userDrugId == 0) {
        this.userDrugsService
          .addNewUserDrug(this.userDrugForm.value)
          .subscribe((data) => {
            console.log(data);
            this.userDrugImage = this.userDrugImage.replace("blob:" , "")
            this.userDrugsService.addPhotoToUserDrug(data.data.id , this.formData).subscribe((data) => {
              
              this.router.navigate(['/userDrugs']);
              console.log(data);
            })
          });
      }
      else {
        this.userDrugsService
          .editUserDrug(this.userDrugId, this.userDrugForm.value)
          .subscribe((data) => {
            console.log(data)
            this.userDrugsService.addPhotoToUserDrug(data.data.id , this.formData).subscribe((data) => {
              this.router.navigate(['/userDrugs']);
              console.log(data);
            })
          });
      }
    }

  }

}
