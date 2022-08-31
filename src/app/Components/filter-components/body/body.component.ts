import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { from } from 'rxjs'; 
import { CarFiltersService } from '../../../Services/car-filters.service';
import { UserDataService } from '../../../Services/user-data.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  label:string = null;
  bodies:any[] = [];

  check(item,index){
    this.carFilter.bodies[index].checked = !this.carFilter.bodies[index].checked;
    if(this.carFilter.bodies[index].checked) {
      this.carFilter.filterObject[this.label].push(item.name.en);
      this.carFilter.getPost();
      this.updateBadge();
    }else{
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name.en === item.name.en);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1)
      this.carFilter.getPost();
      this.updateBadge();
    }
  }
  
  constructor( private carFilter:CarFiltersService, private activated:ActivatedRoute, public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.bodies = this.carFilter.getBodies();
   
    this.carFilter.filterObject[this.label] = [];
    console.log("Changes: ", this.carFilter.filterObject);
  }

  updateBadge(){
    let res = this.bodies.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[0].badge = res.length;
      return val[0]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }

}
