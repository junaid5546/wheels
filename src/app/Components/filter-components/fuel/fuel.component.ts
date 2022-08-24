import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.scss'],
})
export class FuelComponent implements OnInit {

  label:string = null;
  fuel:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.fuel  = this.carFilter.getFuel();
  }

  check(item,index){
    this.carFilter.fuel[index].checked = !this.carFilter.fuel[index].checked;
    this.carFilter.filterObject[this.label].push(item.name);
  }

}
