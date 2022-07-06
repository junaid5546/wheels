import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ad-item-template',
  templateUrl: './item-template.component.html',
  styleUrls: ['./item-template.component.scss'],
})
export class ItemTemplateComponent implements OnInit {

  @Input() posts:any[] = [];

  constructor() { }

  ngOnInit() {}

}
