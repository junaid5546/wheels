import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-engine-size',
  templateUrl: './engine-size.component.html',
  styleUrls: ['./engine-size.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EngineSizeComponent implements OnInit {
  label:string = null;
  engineSize:any = null;
  selectAll:boolean = false; // -1 DEFAULT | 0 UNCHECKED | 1 CHECKED 
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.carFilter.filterObject[this.label] = [];
    this.engineSize = this.carFilter.getEngineSize();
  }

  check(item,index){
    console.log("Checking", index, "selectAll", !this.selectAll);
  }

  selectAllItems(){
    this.selectAll = !this.selectAll;
    this.carFilter.engineSize.forEach(element => element.checked = this.selectAll);
  }

  checkfasdf(){
    console.log("Calling fake funciton");
  }

  updateBadge(){
    let res = this.engineSize.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[9].badge = res.length;
      return val[9]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }
}
