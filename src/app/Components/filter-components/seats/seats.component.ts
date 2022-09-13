import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss'],
})
export class SeatsComponent implements OnInit {
  label:string = null;
  seats:any=null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.seats = this.carFilter.getSeats();
    this.carFilter.filterObject[this.label] = [];
  }
  
  check(item,index){
    this.carFilter.seats[index].checked = !this.carFilter.seats[index].checked;
    if(this.carFilter.seats[index].checked){
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
    let res = this.seats.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[13].badge = res.length;
      return val[13]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }
}
