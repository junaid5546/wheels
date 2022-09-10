import { Component, Input, OnInit } from '@angular/core';
import { ModalControllerService } from '../../../Services/modal-controller.service';
@Component({
  selector: 'app-special-plan-item',
  templateUrl: './special-plan-item.component.html',
  styleUrls: ['./special-plan-item.component.scss'],
})
export class SpecialPlanItemComponent implements OnInit {

 @Input() plans:any[] = null;

  constructor(private modal:ModalControllerService) { }

  ngOnInit() {
    this.plans = this.plans.map(x=>{
      let obj = {...x,selected:false};
      return obj
    });
    console.log("plans in items", this.plans);
  }

  // SELECT PLAN
  selectPlan(planId:string, level_duration:string, index:number,order:number,price:number) {
    this.plans.forEach(x=>x.selected = false);
    let obj = {id:planId,level_duration:level_duration,order:order,price:price};
    console.log("PLAN:", obj);
    this.modal.selectItem(obj,index);
    this.plans[index].selected = true;
  }
}
