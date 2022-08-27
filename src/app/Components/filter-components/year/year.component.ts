import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';

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
  label:string = null;
  modelYear:any[] = null;

  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute, ) { }

  ngOnInit() {
  this.label = this.activated.snapshot.params.label;
  this.modelYear =  this.carFilter.getModelYear();
  this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.modelYear[index].checked = !this.carFilter.modelYear[index].checked;
    if(this.carFilter.modelYear[index].checked){
    this.carFilter.filterObject[this.label].push(item.name);
    this.carFilter.getPost();
    } else {
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
      this.carFilter.getPost();
    }
  }


}
