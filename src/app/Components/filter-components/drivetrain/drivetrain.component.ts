import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-drivetrain',
  templateUrl: './drivetrain.component.html',
  styleUrls: ['./drivetrain.component.scss'],
})
export class DrivetrainComponent implements OnInit {
  label:string = null;
  drivtrain:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.carFilter.filterObject[this.label] = [];
    this.drivtrain = this.carFilter.getDrivTrain();
  }

  check(item,index){
    this.carFilter.driveTrain[index].checked = !this.carFilter.driveTrain[index].checked;
    if( this.carFilter.driveTrain[index].checked ){
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
    let res = this.drivtrain.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[12].badge = res.length;
      return val[12]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }

}
