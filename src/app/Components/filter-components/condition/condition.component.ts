import { Component, OnInit, Input } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { CarFiltersService } from '../../../Services/car-filters.service';
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

    constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.carFilter.filterObject[this.label] = [];
    this.condition = this.carFilter.getCondition();

  }

  check(item,index){
    this.carFilter.condition[index].checked = !this.carFilter.condition[index].checked;
    if( this.carFilter.condition[index].checked ){

      this.carFilter.filterObject[this.label].push(item.name);
    }else{
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
    }
  }
 

}
