import { Component, OnInit, Input } from '@angular/core';
import { filter } from '../../../Interface/car-filter';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  
  @Input() body:filter;

  constructor() { }

  ngOnInit() {}

}
