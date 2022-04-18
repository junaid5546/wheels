import { Component, OnInit } from '@angular/core';

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
     {name:'Gold', order:'First', duration:60, special_duration:7, price:2},
     {name:'Silver', order:'First', duration:60, special_duration:7, price:1.5},
     {name:'Bronze', order:'First', duration:60, special_duration:7, price:1},
     {name:'Regular', order:'Last', duration:60, special_duration:7, price:0}
   ] 
  constructor() { }

  ngOnInit() {}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.days = Number(ev.detail.value);
    console.log('changed Days', this.days);
  }}
