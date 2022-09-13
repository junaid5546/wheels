import { Component, OnInit } from '@angular/core';
import { PlansService } from 'dm-api';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
@Component({
  selector: 'app-special-plans',
  templateUrl: './special-plans.component.html',
  styleUrls: ['./special-plans.component.scss'],
})
export class SpecialPlansComponent implements OnInit {
  days:string = 'thirty_days';
  adOrder:string = 'First';
  adDuration:number = 60;
  price:number = 2.0;
  name:string = "Gold";
  color:string = 'gold';

   plans = []; 
  constructor(private plansApi:PlansService,private filters:CarFiltersService) { }

  ngOnInit() {
    this.getPlans('thirty_days');
   
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    
   
     this.getPlans(ev.detail.value);
  }

  //FETCH ALL PLANS AGAINST DAYS.
  getPlans(days) {
    this.filters.plansData.subscribe((plans)=>{
      console.log("PLANS FROM SERVICE ",plans);
      this.plans = plans[days];
      if(this.plans.length < 4){
        this.plans.push(plans['basic_days']);
      }
      });
  } 


}