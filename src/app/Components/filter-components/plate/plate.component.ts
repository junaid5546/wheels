import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent implements OnInit {

  plateType:any[] = null;
  constructor(private carFilters:CarFiltersService) { }

  ngOnInit() {
    let getType = this.carFilters.getPlateType();
    this.plateType = getType.types.map(plate=>{
      let obj = {...plate, checked:false};
      return obj
    })
  }

  check(index){

  }

}
