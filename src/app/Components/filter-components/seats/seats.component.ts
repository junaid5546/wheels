import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
})
export class SeatsComponent implements OnInit {
  seats:any=null;
  constructor(private filters:CarFiltersService) { }

  ngOnInit() {
    this.seats = this.filters.getSeats();
  }
  
  check(index){
    this.filters.seats[index].checked  = !this.filters.seats[index].checked;
  }
}
