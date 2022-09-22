// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { NavParams } from '@ionic/angular';
import { ItemDetailViewComponent } from 'src/app/Components/item-detail-view/item-detail-view.component';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
 
  @Input() dataArray:any[] = null;
  constructor(public data:ModalControllerService, private filterModal:ModalControllerService, private nav:NavParams) { }
  
  ngOnInit() {
    console.log("ARRAY DATA: ", this.dataArray);
  }

  selectFilter(sortItem){
    let modifiedArray = this.filterModal.applyFilter(this.dataArray,sortItem.id);
    this.filterModal.dismissModal();
  }

}
