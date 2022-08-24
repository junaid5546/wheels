import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
})
export class InsuranceComponent implements OnInit {
  label:string = null;
  insurance:any= null;

  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.insurance  = this.carFilter.getInsurance();
  }

  check(item,index){
    this.carFilter.insurance[index].checked = !this.carFilter.insurance[index].checked;
    this.carFilter.filterObject[this.label].push(item.name);
  }
}
