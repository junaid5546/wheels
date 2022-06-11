import { Component, OnInit, Input } from '@angular/core';
import { filter } from '../../../Interface/car-filter';
@Component({
  selector: 'app-cylinders',
  templateUrl: './cylinders.component.html',
  styleUrls: ['./cylinders.component.scss'],
})
export class CylindersComponent implements OnInit {
  
  @Input() cylinders:filter;

  constructor() { }

  ngOnInit() {}

}
