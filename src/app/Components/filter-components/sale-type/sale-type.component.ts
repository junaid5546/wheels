import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sale-type',
  templateUrl: './sale-type.component.html',
  styleUrls: ['./sale-type.component.scss'],
})
export class SaleTypeComponent implements OnInit {
  label:string = null;
  saleType:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.saleType  = this.carFilter.getDrivingReadiness();
  }

  check(item,index){
    this.carFilter.insurance[index].checked = !this.carFilter.saleType[index].checked;
    if(this.carFilter.saleType[index].checked){
    this.carFilter.filterObject[this.label].push(item.name);
    } else {
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
    }
  }

}
