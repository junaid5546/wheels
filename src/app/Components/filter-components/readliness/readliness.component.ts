import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-readliness',
  templateUrl: './readliness.component.html',
  styleUrls: ['./readliness.component.scss'],
})
export class ReadlinessComponent implements OnInit {

  drivingReadiness:any = null;
  constructor(private carFilter:CarFiltersService) { }

  ngOnInit() {
    this.drivingReadiness  = this.carFilter.getDrivingReadiness();
  }

  check(index){
    this.carFilter.drivingReadiness[index].checked = !this.carFilter.drivingReadiness[index].checked;
  }

}
