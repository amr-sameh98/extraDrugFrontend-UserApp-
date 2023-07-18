import { UserDrugsService } from './../../services/userDrugs.service';
import { UserService } from './../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-drugs',
  templateUrl: './user-drugs.component.html',
  styleUrls: ['./user-drugs.component.css']
})
export class UserDrugsComponent {
  userDrugsList : any[] = []
  userId : any

    constructor(
      private router: Router ,
      private userService: UserService ,
      private userDrugsService : UserDrugsService
      ) {
      this.userId = localStorage.getItem("userId")
  }

  ngOnInit(): void {
    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
    console.log("onInit");

    this.userId = localStorage.getItem("userId")
    this.userService.getUserByID(this.userId).subscribe((data) => {
      console.log(data);
      this.userDrugsList = data.data.drugs
      for (let i = 0; i < this.userDrugsList.length; i++) {
        this.userDrugsList[i].expireDate = this.userDrugsList[i].expireDate.slice(0,10)

      }
      console.log(this.userDrugsList);
    })

    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
    console.log("onInit");



  }

   AddNewDrug() {
    this.router.navigate(['/userDrugForm/0/edit'])
   }

   deleteDrug(userDrugId: any) {
    Swal.fire({
      title: 'Are you sure want to remove this drug ?',
      text: 'You will not be able to recover this drug!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.userDrugsService.deleteUserDrug(userDrugId).subscribe(() => {
          this.userDrugsList = this.userDrugsList.filter((userDrug : any) => userDrug.id != userDrugId)
        })
      }
    })

   }

}
