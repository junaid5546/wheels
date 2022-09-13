import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-interior-color',
  templateUrl: './interior-color.component.html',
  styleUrls: ['./interior-color.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InteriorColorComponent implements OnInit {
  checked:boolean =false;
  label:string = null;
  interiorColor:any = null;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  check(item,index){
    this.carFilter.interiorColor[index].checked = !this.carFilter.interiorColor[index].checked;
    if(this.carFilter.interiorColor[index].checked){
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

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.interiorColor = this.carFilter.getInteriorColor();
    this.carFilter.filterObject[this.label] = [];
  }

  selectAllItem(){
    
  }

  updateBadge(){
    let res = this.interiorColor.filter(x=>x.checked);
    this.carFilter.filterSource.pipe(
      map((val: any) => {
      val[6].badge = res.length;
      return val[6]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }
}
