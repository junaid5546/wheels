import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss'],
})
export class OriginComponent implements OnInit {
  origin:any[] = [];
  label:string = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.origin = this.carFilter.getOrigin();
    this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.origin[index].checked = !this.carFilter.origin[index].checked;
    if(this.carFilter.origin[index].checked){
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
    let res = this.origin.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[14].badge = res.length;
      return val[14]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }

}
