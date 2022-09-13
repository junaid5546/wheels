import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-plate',
  templateUrl: './plate.component.html',
  styleUrls: ['./plate.component.scss'],
})
export class PlateComponent implements OnInit {

  plateType:any[] = null;
  label:string = null;

  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.plateType = this.carFilter.getPlateType();
    this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.plateType[index].checked = !this.carFilter.plateType[index].checked;
    if(this.carFilter.plateType[index].checked){
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
    let res = this.plateType.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[16].badge = res.length;
      return val[16]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }
}
