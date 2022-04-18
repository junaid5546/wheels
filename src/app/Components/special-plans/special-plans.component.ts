import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-plans',
  templateUrl: './special-plans.component.html',
  styleUrls: ['./special-plans.component.scss'],
})
export class SpecialPlansComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }}
