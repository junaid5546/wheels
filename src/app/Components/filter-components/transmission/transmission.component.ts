import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-transmission',
  templateUrl: './transmission.component.html',
  styleUrls: ['./transmission.component.scss'],
})
export class TransmissionComponent implements OnInit {
  
  label:string = null;
  transmission:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.transmission = this.carFilter.getTransmission();
  }
  
  check(item,index){
    this.carFilter.insurance[index].checked = !this.carFilter.transmission[index].checked;
    if(this.carFilter.transmission[index].checked){
    this.carFilter.filterObject[this.label].push(item.name);
    } else {
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
    }
  }

}
