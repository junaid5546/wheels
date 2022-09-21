import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
import { DebugerService } from 'src/app/Services/debuger.service';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-filter-item-grid',
  templateUrl: './filter-item-grid.component.html',
  styleUrls: ['./filter-item-grid.component.scss'],
})
export class FilterItemGridComponent implements OnInit {

  label:string = null;
  bodies:any[] = [];

  check(){}
  
  constructor( private carFilter:CarFiltersService, private activated:ActivatedRoute, public userData:UserDataService, private debug:DebugerService) { }

  ngOnInit() {
    this.debug.log('Watched filter : ',this.carFilter.getCurrentFilter(),'green' , true);
  }



}
