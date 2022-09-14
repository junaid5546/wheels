import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CountryCodeList } from '../../../Constants/country-codes';
@Component({
  selector: 'app-country-code-picker',
  templateUrl: './country-code-picker.component.html',
  styleUrls: ['./country-code-picker.component.scss'],
})
export class CountryCodePickerComponent implements OnInit {
  countryCodeList:any[] = CountryCodeList.countryCodes;
  searchedList:any[] = [];
  searching:boolean= false;
  selectedCountryCode:string=null;
  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  searchFromArray(item:any){
    console.log("ITEM :", item);
    let name:string = item.value;

    if(name.length > 0) {
      this.searching = true;
      this.searchedList  = this.countryCodeList.filter(x=>x.name.startsWith(name));
    } else {
      this.searching = false;
    }


  }

  selectItem(item){
    this.selectedCountryCode  = item.dial_code;
    console.log("SELECTED CODE: ", this.selectedCountryCode);
    this.modalController.dismiss({
      item
    });
  }




}