import { Component, OnInit, ViewChild, Input, Output, EventEmitter   } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'ad-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  
  @Input() bodies:any[] = [];
  @Input() models:any[] = [];

  @Output() changeInBody = new EventEmitter<string>();
  @Output() changeInModel = new EventEmitter<string>();

  make:any[] = [{name:"camry",selected:true},{name:"avalon",selected:false},{name:"LS 570",selected:false}]
  subList:any[] = [{name:"SUDAN",selected:true},{name:"Small SUV",selected:false},{name:"Quad Bike",selected:false}]
  itemsList:any[] = [{name:"Vehicles for Sale",selected:true},{name:"Vehicles for Rent",selected:false},{name:"Plates for Sale",selected:false},{name:"Vehicles for Sale",selected:false},{name:"Vehicles for Rent",selected:false},{name:"Plates for Sale",selected:false}]
  
  constructor() { }

  ngOnInit() {
    console.log("Models:",this.models );
  }

  /**
   * SELECTS THE BODY
   * @param _bodyName string
   */
  selectBody(_bodyName:string,i){
    this.bodies[i].selected  = !this.bodies[i].selected;
    this.changeInBody.emit(_bodyName);
    console.log("BODY NAME:", _bodyName);
  }

  /**
   * SELECTS THE MODELS.
   * @param _modelName string
   */
  selectModel(_modelName:string,i) {
    this.models[i].selected  = !this.models[i].selected;
    this.changeInModel.emit(_modelName);
    console.log("Model Name:", _modelName);

  }

}
