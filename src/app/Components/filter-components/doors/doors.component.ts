import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss'],
})
export class DoorsComponent implements OnInit {
  label:string = null;
  doors:any = null;

  constructor(private filters:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.doors = this.filters.getDoors();
    this.filters.filterObject[this.label] = [];
  }

  check(item,i){
        this.doors[i].checked = !this.doors[i].checked;
        this.filters.filterObject[this.label].push(item.name);
  }

}
