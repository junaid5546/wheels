import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss'],
})
export class OriginComponent implements OnInit {
  origin:any[] = [];
  constructor(private filter:CarFiltersService) { }

  ngOnInit() {
    this.origin = this.filter.getOrigin();
  }

  check(index:number){
    this.filter.origin[index].checked = !this.filter.origin[index].checked;
  }

}
