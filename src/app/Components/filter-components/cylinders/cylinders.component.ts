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

  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.cylinders = this.carFilter.getCylinderType();
    this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.cylinders[index].checked = !this.carFilter.cylinders[index].checked;
    if( this.carFilter.cylinders[index].checked ){

      this.carFilter.filterObject[this.label].push(item.name);
    }else{
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
    }
  }

}
