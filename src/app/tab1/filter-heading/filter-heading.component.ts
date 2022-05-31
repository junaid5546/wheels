import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  ModalControllerService } from '../../Services/modal-controller.service';
import { FiltersComponent } from '../../Models/filters/filters.component';
import { FilterPage } from '../../Pages/filter/filter.page';
@Component({
  selector: 'app-filter-heading',
  templateUrl: './filter-heading.component.html',
  styleUrls: ['./filter-heading.component.scss'],
})
export class FilterHeadingComponent implements OnInit {
  items:any[] = [];
  constructor(private route:Router,private modelCtrl:ModalControllerService,) { }

  ngOnInit() {}

  showFilters() {
    this.route.navigate(['filter'])
  }

  openSheetmodel() {
    this.modelCtrl.presentSheetModal(FiltersComponent,this.items);
  }

  openFilterSheetModel() {
    this.modelCtrl.presentSheetModal(FilterPage,this.items);
  }


}
