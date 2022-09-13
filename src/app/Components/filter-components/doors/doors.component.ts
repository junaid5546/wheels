import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-doors',
  templateUrl: './doors.component.html',
  styleUrls: ['./doors.component.scss'],
})
export class DoorsComponent implements OnInit {
  label:string = null;
  doors:any = null;

  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.doors = this.carFilter.getDoors();
    this.carFilter.filterObject[this.label] = [];
  }

  check(item,index){
    this.carFilter.doors[index].checked = !this.carFilter.doors[index].checked;
    if( this.carFilter.doors[index].checked ){
      this.carFilter.filterObject[this.label].push(item.name);
      this.carFilter.getPost();
      this.updateBadge()
    }else{
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
      this.carFilter.getPost();
      this.updateBadge()
    }
  }

  updateBadge(){
    let res = this.doors.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[7].badge = res.length;
      return val[7]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }

}
