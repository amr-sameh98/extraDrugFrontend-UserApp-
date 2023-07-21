import { UserDrugsService } from 'src/app/services/userDrugs.service';
import { DrugsService } from 'src/app/services/drugs.service';

import { FormControl } from '@angular/forms';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Idrug } from 'src/app/models/idrug';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drug-search',
  templateUrl: './drug-search.component.html',
  styleUrls: ['./drug-search.component.css']
})
export class DrugSearchComponent {
  allDrugsList! : Idrug[]
  drugId: any
  coordsLongitude : any
  coordsLatitude: any


  public drugsCtrl: FormControl = new FormControl();
  public drugsFilterCtrl: FormControl = new FormControl();
  public filteredDrugs: ReplaySubject<any> = new ReplaySubject(1);

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect;

  protected _onDestroy = new Subject();


    constructor(private drugsService: DrugsService ,
      private activatedRoute: ActivatedRoute ,
      private userDrugsService : UserDrugsService) { }

  ngOnInit() {
    this.drugsService.getAllDrugs().subscribe((data) => {
      // console.log(data.data);
      this.allDrugsList = data.data
      console.log(this.allDrugsList);
      // this.drugsCtrl.setValue(this.allDrugsList[1]);
      this.filteredDrugs.next(this.allDrugsList.slice());
      this.drugsFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterDrugs();
        });
    })

    this.getLocation()
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next(console.log("sss"));
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredDrugs
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
          this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected filterDrugs() {
    if (!this.allDrugsList) {
      return;
    }

    let search = this.drugsFilterCtrl.value;
    if (!search) {
      this.filteredDrugs.next(this.allDrugsList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredDrugs.next(
      this.allDrugsList.filter(drug  => drug.en_Name.toLowerCase().indexOf(search) > -1)
    );
  }

  setDrugId(value : any) {
    // console.log(value);
    this.drugId = value
    // console.log(this.drugId);



  }

  getLocation()
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordsLongitude = position.coords.longitude;
        this.coordsLatitude =  position.coords.latitude;
        // console.log(this.coordsLongitude.value);
        // console.log(this.coordsLatitude.value);
        // this.isGetLocation = true
        // console.log(this.isGetLocation);
      }, err => console.error("have not permission"));
    } else {
      console.log("No support for geolocation")
    }
  }

  searchForDrug() {

    console.log(this.drugId);


    console.log(this.coordsLongitude);
    console.log(this.coordsLatitude);
    this.userDrugsService.searchForUserDrug(this.drugId , this.coordsLatitude , this.coordsLongitude).subscribe((data) => {
      console.log(data);

    })
  }

}
