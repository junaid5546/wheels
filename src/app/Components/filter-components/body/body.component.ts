import { Component, OnInit } from '@angular/core';
import { filter } from '../../../Interface/car-filter';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  
  body:filter[] = [];

  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.body = JSON.parse(this.router.snapshot.params.data);
    console.log("SNAPSHOT : ", JSON.parse(this.router.snapshot.params.data));
  }

}
