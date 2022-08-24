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

    constructor(private filter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.filter.filterObject[this.label] = [];
    this.condition = this.filter.getCondition();

  }

  check(item,i) {
    this.filter.condition[i].checked = !this.filter.condition[i].checked;
    this.filter.filterObject[this.label].push(item.name);
  }
 

}
