import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-engine-size',
  templateUrl: './engine-size.component.html',
  styleUrls: ['./engine-size.component.scss'],
})
export class EngineSizeComponent implements OnInit {
  label:string = null;
  engineSize:any = null;

  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.engineSize = this.carFilter.getEngineSize();
  }

  check(item,index){
    this.carFilter.engineSize[index].checked = !this.carFilter.engineSize[index].checked;
    if( this.carFilter.engineSize[index].checked ){

      this.carFilter.filterObject[this.label].push(item.name);
    }else{
      let alreadyInBox = this.carFilter.filterObject[this.label].findIndex((name) => name === item.name);
      this.carFilter.filterObject[this.label].splice(alreadyInBox, 1);
    }
  }
}
