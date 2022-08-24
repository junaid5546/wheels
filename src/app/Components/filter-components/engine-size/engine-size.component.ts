import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-engine-size',
  templateUrl: './engine-size.component.html',
  styleUrls: ['./engine-size.component.scss'],
})
export class EngineSizeComponent implements OnInit {

  engineSize:any = null;

  constructor(private carFilter:CarFiltersService) { }

  ngOnInit() {
    this.engineSize = this.carFilter.getEngineSize();
  }

  check(index){
    this.carFilter.engineSize[index].checked = !this.carFilter.engineSize[index].checked;
  }
}
