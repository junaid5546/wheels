import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-transmission',
  templateUrl: './transmission.component.html',
  styleUrls: ['./transmission.component.scss'],
})
export class TransmissionComponent implements OnInit {

  transmission:any = null;
  constructor(private filters:CarFiltersService) { }

  ngOnInit() {
    this.transmission = this.filters.getTransmission();
  }
  
  check(i) {
    this.filters.transmission[i].checked = !this.filters.transmission[i].checked;
  }
}
