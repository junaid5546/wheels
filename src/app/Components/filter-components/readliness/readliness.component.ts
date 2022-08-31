import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
@Component({
  selector: 'app-readliness',
  templateUrl: './readliness.component.html',
  styleUrls: ['./readliness.component.scss'],
})
export class ReadlinessComponent implements OnInit {
  label:string = null;
  drivingReadiness:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.drivingReadiness  = this.carFilter.getDrivingReadiness();
    this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.insurance[index].checked = !this.carFilter.drivingReadiness[index].checked;
    if(this.carFilter.drivingReadiness[index].checked){
    this.carFilter.filterObject[this.label].push(item.name);
    this.carFilter.getPost();
    } else {
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
      this.carFilter.getPost();
    }
  }

}
