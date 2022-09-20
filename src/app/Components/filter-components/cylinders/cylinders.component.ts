import { Component, OnInit, Input } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-cylinders',
  templateUrl: './cylinders.component.html',
  styleUrls: ['./cylinders.component.scss'],
})
export class CylindersComponent implements OnInit {
  selectAll:boolean = false;
   label:string = null;
   cylinders:any = null;

  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.cylinders = this.carFilter.getCylinderType();
    this.carFilter.filterObject[this.label] = [];
    console.log("Changes: ", this.carFilter.filterObject);
  }

  check(item,index){
    this.carFilter.cylinders[index].checked = !this.carFilter.cylinders[index].checked;
    if( this.carFilter.cylinders[index].checked ){
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

  selectAllItems(){
    
  }

  updateBadge(){
    let res = this.cylinders.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[8].badge = res.length;
      return val[8]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }

}
