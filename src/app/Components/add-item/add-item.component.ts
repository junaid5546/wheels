import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {

  items:any[] = [
    {name:'Vehicles'},{name:'Estates'},{name:'Furniture'},{name:'Fashion'},{name:'Animals'},{name:'Plants'},{name:"Jobs"},{name:'Services'}
  ]
  constructor() { }

  ngOnInit() {}

}
