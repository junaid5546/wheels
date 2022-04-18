import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-plan-item',
  templateUrl: './special-plan-item.component.html',
  styleUrls: ['./special-plan-item.component.scss'],
})
export class SpecialPlanItemComponent implements OnInit {
 @Input() days:number = null;
 @Input() adOrder:string = null;
 @Input() adDuration:number = null;
 @Input() price:number = null;
 @Input() name:string = null;
 @Input() color:string = null;
  constructor() { }

  ngOnInit() {}

}
