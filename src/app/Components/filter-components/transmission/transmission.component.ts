import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-transmission',
  templateUrl: './transmission.component.html',
  styleUrls: ['./transmission.component.scss'],
})
export class TransmissionComponent implements OnInit {
  
  label:string = null;
  transmission:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.transmission = this.carFilter.getTransmission();
    this.carFilter.filterObject[this.label] = [];
  }
  
  check(item,index){
    this.carFilter.transmission[index].checked = !this.carFilter.transmission[index].checked;
    if(this.carFilter.transmission[index].checked){
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
    let res = this.transmission.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[11].badge = res.length;
      return val[11]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }

}
