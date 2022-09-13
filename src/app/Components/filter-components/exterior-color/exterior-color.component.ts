import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-exterior-color',
  templateUrl: './exterior-color.component.html',
  styleUrls: ['./exterior-color.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ExteriorColorComponent implements OnInit {
  checked:boolean =false;
  label:string = null;
  exteriorColors:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  check(item,index){
    this.carFilter.exteriorColor[index].checked = !this.carFilter.exteriorColor[index].checked;
    if( this.carFilter.exteriorColor[index].checked ){
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

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    console.log("On init called exterior color");
    this.exteriorColors = this.carFilter.getExteriorColor();
    this.carFilter.filterObject[this.label] = [];
  }

  selectAllItem(){

  }

  updateBadge(){
    let res = this.exteriorColors.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[5].badge = res.length;
      return val[5]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }
}
