import { Component, Input, OnInit } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
 
  @Input() dataArray:any[] = null;
  constructor(public data:ModalControllerService, private filterModal:ModalControllerService, private nav:NavParams) { }
  
  ngOnInit() {
  
    this.dataArray = this.nav.get("dataArray");
    console.log("ARRAY DATA: ", this.dataArray);
  }

  selectFilter(filterId){
    console.log("ARRAY IS: ", this.dataArray);
    console.log("Apply this filter:", filterId);
    let modifiedArray = this.filterModal.applyFilter(this.dataArray,filterId);
    console.log(modifiedArray);
    this.filterModal.dismissModal();
  }

}
