import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.scss'],
})
export class FuelComponent implements OnInit {

  fuel:any = null;
  constructor(private carFilter:CarFiltersService) { }

  ngOnInit() {
    this.fuel  = this.carFilter.getFuel();
  }

  check(index){
    this.carFilter.fuel[index].checked = !this.carFilter.fuel[index].checked;
  }

}
