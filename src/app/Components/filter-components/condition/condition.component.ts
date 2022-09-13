import { Component, OnInit, Input } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss'],
})
export class ConditionComponent implements OnInit {

  label:string = null;
  condition:any[] = null;

    constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.carFilter.filterObject[this.label] = [];
    this.condition = this.carFilter.getCondition();
    console.log("Changes: ", this.carFilter.filterObject);

  }

  check(item,index){
    this.carFilter.condition[index].checked = !this.carFilter.condition[index].checked;
    if( this.carFilter.condition[index].checked ){
      this.carFilter.filterObject[this.label].push(item.name);
      this.carFilter.getPost();
      this.updateBadge();
    }else{
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
      this.carFilter.getPost();
      this.updateBadge();
    }
  }

  updateBadge(){
    let res = this.condition.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[3].badge = res.length;
      return val[3]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }
 

}
