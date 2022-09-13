import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-warranty-duration',
  templateUrl: './warranty-duration.component.html',
  styleUrls: ['./warranty-duration.component.scss'],
})
export class WarrantyDurationComponent implements OnInit {
  label:string = null;
  results:any;
  WarrantyDuration:any[] = null;
  constructor(private activated:ActivatedRoute, private carFilter:CarFiltersService,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.WarrantyDuration = this.carFilter.getWarrentyDuration();
    this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.warrentyDuration[index].checked = !this.carFilter.warrentyDuration[index].checked;
    if(this.carFilter.warrentyDuration[index].checked){
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
    let res = this.WarrantyDuration.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[19].badge = res.length;
      return val[19]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }

}
