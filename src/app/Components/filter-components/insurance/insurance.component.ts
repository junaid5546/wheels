import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
})
export class InsuranceComponent implements OnInit {
  label:string = null;
  insurance:any= null;

  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.insurance  = this.carFilter.getInsurance();
    this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.insurance[index].checked = !this.carFilter.insurance[index].checked;
    if(this.carFilter.insurance[index].checked){
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
    let res = this.insurance.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[15].badge = res.length;
      return val[15]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }
}
