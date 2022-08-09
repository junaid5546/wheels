import { Component, OnInit } from '@angular/core';
import { PlansService } from 'dm-api';
@Component({
  selector: 'app-special-plans',
  templateUrl: './special-plans.component.html',
  styleUrls: ['./special-plans.component.scss'],
})
export class SpecialPlansComponent implements OnInit {
  days:number = 7;
  adOrder:string = 'First';
  adDuration:number = 60;
  price:number = 2.0;
  name:string = "Gold";
  color:string = 'gold';

   plans = [ 
     {name:'Gold', color:'yellow', order:'First', duration:60, special_duration:7, price:2},
     {name:'Silver', color:'silver', order:'First', duration:60, special_duration:7, price:1.5},
     {name:'Bronze', color:'bronze', order:'First', duration:60, special_duration:7, price:1},
     {name:'Regular', color:'white', order:'Last', duration:60, special_duration:7, price:0}
   ] 
  constructor(private plansApi:PlansService) { }

  ngOnInit() {
    this.getPlans(7);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    // this.getPlans(ev.detail.value);
  }

  //FETCH ALL PLANS AGAINST DAYS.
  getPlans(days:number) {
    console.log("PLANS CALLED");
    this.plansApi.getPlans('62e76b90839e15bb730a935e','en')
    .then((plans:any)=>{
      console.log("THEN");
      if(plans.code === 200){
        console.log("PLANS");
      this.plans = plans.result
      } else {
        console.log("NULL");
        this.plans = null;
      }
    })
    .catch((error)=>{
      console.log("ERROR: ", error);
    })
  } 


}