import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.scss'],
})
export class FuelComponent implements OnInit {

  label:string = null;
  fuel:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    console.log("Fuel");
    this.label = this.activated.snapshot.params.label;
    this.carFilter.filterObject[this.label] = [];
    this.fuel  = this.carFilter.getFuel();
  }

  check(item,index){
    this.carFilter.fuel[index].checked = !this.carFilter.fuel[index].checked;
    if( this.carFilter.fuel[index].checked ){
      this.label = this.activated.snapshot.params.label;
      this.carFilter.filterObject[this.label].push(item.name);
      this.carFilter.getPost();
    }else{
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
      this.carFilter.getPost();
    }
  }

}
