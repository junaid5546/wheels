import { Component, OnInit, Input } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cylinders',
  templateUrl: './cylinders.component.html',
  styleUrls: ['./cylinders.component.scss'],
})
export class CylindersComponent implements OnInit {
  
   label:string = null;
   cylinders:any = null;

  constructor(private carFilters:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.cylinders = this.carFilters.getCylinderType();
    this.carFilters.filterObject[this.label] = [];
  }

  check(item,i) {
    this.carFilters.cylinders[i].checked = !this.carFilters.cylinders[i].checked;
    this.carFilters.filterObject[this.label].push(item.name);
  }

}
