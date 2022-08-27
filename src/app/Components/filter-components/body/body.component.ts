import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  label:string = null;
  bodies:any[] = [];

  check(item,index){
    this.carFilter.bodies[index].checked = !this.carFilter.bodies[index].checked;
    if(this.carFilter.bodies[index].checked){
      this.carFilter.filterObject[this.label].push(item.name);
      this.carFilter.getPost();
    }else{
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1)
      this.carFilter.getPost();
    }
  }
  
  constructor( private carFilter:CarFiltersService, private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.bodies = this.carFilter.getBodies();
    this.carFilter.filterObject[this.label] = [];
    console.log("Changes: ", this.carFilter.filterObject);
  }

}
