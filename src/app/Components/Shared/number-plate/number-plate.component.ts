import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-plate',
  templateUrl: './number-plate.component.html',
  styleUrls: ['./number-plate.component.scss'],
})
export class NumberPlateComponent implements OnInit {

  @Input() item:any;
  constructor() { }

  ngOnInit() {
    console.log("ITM: ", this.item);
  }

}
