import { Component, OnInit, Input } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-cylinders',
  templateUrl: './cylinders.component.html',
  styleUrls: ['./cylinders.component.scss'],
})
export class CylindersComponent implements OnInit {
  
 
   cylinders:any = null;

  constructor(private carFilters:CarFiltersService) { }

  ngOnInit() {
    this.cylinders = this.carFilters.getCylinderType();
    console.log("CYLINDER: ", this.cylinders);;
  }

  check(i) {
    this.carFilters.cylinders[i].checked = !this.carFilters.cylinders[i].checked;
  }

}
