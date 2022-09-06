import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class YearComponent implements OnInit {

  label:string = null;
  modelYear:any[] = null;
  selectAll:boolean = false;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService, private detectRef:ChangeDetectorRef ) { }

  ngOnInit() {

        this.label = this.activated.snapshot.params.label;
        this.modelYear =  this.carFilter.getModelYear();
        this.carFilter.filterObject[this.label] = [];

  }

  check(item,index){
          console.log("check called");
          this.carFilter.modelYear[index].checked = !this.carFilter.modelYear[index].checked;
          if(this.carFilter.modelYear[index].checked){
          this.carFilter.filterObject[this.label].push(item.name.en);
          this.detectRef.markForCheck();
    } else {
          //this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
          //this.carFilter.getPost();
    }
  }

  selectAllItems(){
    this.selectAll = !this.selectAll;
  if(this.selectAll){
    console.log("Year: ", this.modelYear);
    this.modelYear.forEach(x=> x.checked = true);
  } else {
    this.modelYear.forEach(x=> x.checked = false);
  }
}

}
