import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-warranty-duration',
  templateUrl: './warranty-duration.component.html',
  styleUrls: ['./warranty-duration.component.scss'],
})
export class WarrantyDurationComponent implements OnInit {
  results:any;
  WarrantyDuration:any[] = null;
  constructor(private router:Router, private filter:CarFiltersService) { }

  ngOnInit() {
    this.WarrantyDuration = this.filter.getWarrentyDuration();

  }

  check(index){
    this.filter.warrentyDuration[index].checked = !this.filter.warrentyDuration[index].checked;
    console.log("CHECKED: ", this.filter.warrentyDuration[index].checked);
  }

}
