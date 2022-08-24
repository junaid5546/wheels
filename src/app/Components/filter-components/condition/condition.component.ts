import { Component, OnInit, Input } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { filter } from '../../../Interface/car-filter';
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

  condition:any[] = null;
  
 
    constructor(private filter:CarFiltersService) { }

  ngOnInit() {
    this.condition = this.filter.getCondition();
  }

  check(i) {
    this.filter.condition[i].checked = !this.filter.condition[i].checked;
  }
 

  

}
