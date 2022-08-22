import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { CarFiltersService } from '../../../Services/car-filters.service';

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
})
export class YearComponent implements OnInit {

  modelYear:any[] = null;

  constructor(private filters:CarFiltersService) { }

  ngOnInit() {
   this.modelYear =  this.filters.getModelYear();
   console.log("YEAR: ", this.modelYear);
   
  }

  check(index){
    this.filters.modelYear[index].checked = !this.filters.modelYear[index].checked;
  }


}
