import { Component } from '@angular/core';
import { UserDrugsService } from 'src/app/services/userDrugs.service';

@Component({
  selector: 'app-all-users-drugs',
  templateUrl: './all-users-drugs.component.html',
  styleUrls: ['./all-users-drugs.component.css']
})
export class AllUsersDrugsComponent {

  allUsersDrugsList : any[] = []
  userId : any

    constructor(
      // private router: Router ,
      // private userService: UserService ,
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
    this.userDrugsService.getAllUsersDrugs().subscribe((response) => {
      console.log(response);
      this.allUsersDrugsList = response.data
      for (let i = 0; i < this.allUsersDrugsList.length; i++) {
        this.allUsersDrugsList[i].expireDate = this.allUsersDrugsList[i].expireDate.slice(0,10)
      }
      console.log(this.allUsersDrugsList);
    })

    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
    console.log("onInit");
  }



}
