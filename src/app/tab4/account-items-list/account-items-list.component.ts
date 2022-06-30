import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-items-list',
  templateUrl: './account-items-list.component.html',
  styleUrls: ['./account-items-list.component.scss'],
})
export class AccountItemsListComponent implements OnInit {
  @Input() accountList:any[];
  constructor(private router:Router) { }

  ngOnInit() {}

  navigate(route:string){
    this.router.navigate([route]);
  }
}
