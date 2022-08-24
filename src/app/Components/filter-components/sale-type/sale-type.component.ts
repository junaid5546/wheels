import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-sale-type',
  templateUrl: './sale-type.component.html',
  styleUrls: ['./sale-type.component.scss'],
})
export class SaleTypeComponent implements OnInit {

  saleType:any = null;
  constructor(private carFilter:CarFiltersService) { }

  ngOnInit() {
    this.saleType  = this.carFilter.getDrivingReadiness();
  }

  check(index){
    this.carFilter.saleType[index].checked = !this.carFilter.saleType[index].checked;
  }

}
