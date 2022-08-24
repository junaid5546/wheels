import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-warranty-duration',
  templateUrl: './warranty-duration.component.html',
  styleUrls: ['./warranty-duration.component.scss'],
})
export class WarrantyDurationComponent implements OnInit {
  label:string = null;
  results:any;
  WarrantyDuration:any[] = null;
  constructor(private activated:ActivatedRoute, private filter:CarFiltersService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.WarrantyDuration = this.filter.getWarrentyDuration();
  }

  check(item,index){
    this.filter.warrentyDuration[index].checked = !this.filter.warrentyDuration[index].checked;
    console.log("CHECKED: ", this.filter.warrentyDuration[index].checked);
    this.filter.filterObject[this.label].push(item.name);
  }

}
