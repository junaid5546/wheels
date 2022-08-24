import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent implements OnInit {

  plateType:any[] = null;
  label:string = null;

  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    let getType = this.carFilter.getPlateType();
    this.plateType = getType.types.map(plate=>{
      let obj = {...plate, checked:false};
      return obj
    })
  }

  check(item,index){
    this.carFilter.insurance[index].checked = !this.carFilter.plateType[index].checked;
    if(this.carFilter.plateType[index].checked){
    this.carFilter.filterObject[this.label].push(item.name);
    } else {
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
    }
  }

}
