import { Component, OnInit } from '@angular/core';
import { filter } from '../../../Interface/car-filter';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss'],
})
export class OriginComponent implements OnInit {
  origin:filter[] = [];
  constructor(private router:ActivatedRoute) { }

  ngOnInit() {
    this.origin = JSON.parse(this.router.snapshot.params.data);
    console.log("SNAPSHOT : ", JSON.parse(this.router.snapshot.params.data));
  }

}
