import { Component, OnInit } from '@angular/core';
import { filter } from '../../../Interface/car-filter';
@Component({
  selector: 'app-interior-color',
  templateUrl: './interior-color.component.html',
  styleUrls: ['./interior-color.component.scss'],
})
export class InteriorColorComponent implements OnInit {
  colors = [
    {
      name:"White",
      class:'white'
    },
    {
      name:"Beign",
      class:'beign'
    },
    {
      name:"Yellow",
      class:'yellow'
    },
    {
      name:"Gold",
      class:'gold'
    },
    {
      name:"Orange",
      class:'orange'
    },
    {
      name:"Saffron",
      class:'saffron'
    },
    {
      name:"Brown",
      class:'brown'
    },
    {
      name:"Maroon",
      class:'maroon'
    },
    {
      name:"Red",
      class:'red'
    },
    {
      name:"Pink",
      class:'pink'
    },
    {
      name:"Purple",
      class:'purple'
    },
    {
      name:"Blue",
      class:'blue'
    },
    {
      name:"Cyan",
      class:'cyan'
    },
    {
      name:"Green",
      class:'green'
    },
    {
      name:"Silver",
      class:'silver'
    },
    {
      name:"Gray",
      class:'gray'
    },
    {
      name:"Black",
      class:'black'
    },
    {
      name:"Tan",
      class:'tan'
    },
  ];
  constructor() { }

  ngOnInit() {}

}
