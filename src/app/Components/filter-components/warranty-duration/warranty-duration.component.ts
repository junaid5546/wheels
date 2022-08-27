import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-warranty-duration',
  templateUrl: './warranty-duration.component.html',
  styleUrls: ['./warranty-duration.component.scss'],
})
export class WarrantyDurationComponent implements OnInit {
  label:string = null;
  results:any;
  WarrantyDuration:any[] = null;
  constructor(private activated:ActivatedRoute, private carFilter:CarFiltersService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.WarrantyDuration = this.carFilter.getWarrentyDuration();
    this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.insurance[index].checked = !this.carFilter.warrentyDuration[index].checked;
    if(this.carFilter.warrentyDuration[index].checked){
    this.carFilter.filterObject[this.label].push(item.name);
    this.carFilter.getPost();
    } else {
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
      this.carFilter.getPost();
    }
  }

}
