import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss'],
})
export class DoorsComponent implements OnInit {
  doors:any = null;

  constructor(private filters:CarFiltersService) { }

  ngOnInit() {
    this.doors = this.filters.getDoors();
  }

  check(i){
        this.doors[i].checked = !this.doors[i].checked;
  }

}
