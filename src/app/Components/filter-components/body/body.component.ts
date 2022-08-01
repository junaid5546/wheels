import { Component, OnInit } from '@angular/core';
import { filter } from '../../../Interface/car-filter';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  
  body:filter[] = [];

  constructor(private router:Router) { }

  ngOnInit() {
    //this.body = JSON.parse(this.router.snapshot.params.data);
    //this.body =  this.router.getCurrentNavigation().extras.state;
    console.log(this.router.getCurrentNavigation().extras.state)
    
  }

}
