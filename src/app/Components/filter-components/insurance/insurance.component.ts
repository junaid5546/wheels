import { Component, OnInit } from '@angular/core';
import {  } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
})
export class InsuranceComponent implements OnInit {
  insurance:any= null;
  constructor() { }

  ngOnInit() {
    
  }

  check(i){

  }
}
