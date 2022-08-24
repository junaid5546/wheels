import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  label:string = null;
  bodies:any[] = [];

  checkCurrentItem(item,index){
    this.carFilters.bodies[index].checked = !this.carFilters.bodies[index].checked;
    console.log("Current Clickec item: " , item);
    this.carFilters.filterObject[this.label].push(item.name);
  }
  
  constructor( private carFilters:CarFiltersService, private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.bodies = this.carFilters.getBodies();
    this.carFilters.filterObject[this.label] = [];
  }

}
