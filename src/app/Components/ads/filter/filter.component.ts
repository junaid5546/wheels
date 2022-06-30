import { Component, OnInit, ViewChild,  } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'ad-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  make:any[] = [{name:"camry",selected:true},{name:"avalon",selected:false},{name:"LS 570",selected:false}]
  subList:any[] = [{name:"SUDAN",selected:true},{name:"Small SUV",selected:false},{name:"Quad Bike",selected:false}]
  itemsList:any[] = [{name:"Vehicles for Sale",selected:true},{name:"Vehicles for Rent",selected:false},{name:"Plates for Sale",selected:false},{name:"Vehicles for Sale",selected:false},{name:"Vehicles for Rent",selected:false},{name:"Plates for Sale",selected:false}]
  constructor() { }

  ngOnInit() {}

}
