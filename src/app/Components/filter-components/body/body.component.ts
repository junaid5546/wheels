import { Component, OnInit } from '@angular/core';
import { filter } from '../../../Interface/car-filter';
import { ActivatedRoute, Router } from '@angular/router';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  
  bodies:any[] = [];

  checkCurrentItem(item,index){
    this.carFilters.bodies[index].checked = !this.carFilters.bodies[index].checked;
    console.log("Current Clickec item: " , item);
  }
  
  constructor(private router:Router, private carFilters:CarFiltersService) { }

  ngOnInit() {
    //this.body = JSON.parse(this.router.snapshot.params.data);
    //this.body =  this.router.getCurrentNavigation().extras.state;
    this.bodies = this.carFilters.getBodies();
    console.log("Car body in bodies",this.carFilters.getBodies());
    
  }

}
