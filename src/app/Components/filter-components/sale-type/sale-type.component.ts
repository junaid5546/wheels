import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-sale-type',
  templateUrl: './sale-type.component.html',
  styleUrls: ['./sale-type.component.scss'],
})
export class SaleTypeComponent implements OnInit {
  label:string = null;
  saleType:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.saleType  = this.carFilter.getSaleType();
    console.log("Sale Type", this.saleType);
    this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.saleType[index].checked = !this.carFilter.saleType[index].checked;
    if(this.carFilter.saleType[index].checked){
    this.carFilter.filterObject[this.label].push(item.name);
    this.carFilter.getPost();
    this.updateBadge()
    } else {
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
      this.carFilter.getPost();
      this.updateBadge()
    }
  }

  updateBadge(){
    let res = this.saleType.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[18].badge = res.length;
      return val[18]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }

}
