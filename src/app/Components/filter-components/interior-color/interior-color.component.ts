import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-interior-color',
  templateUrl: './interior-color.component.html',
  styleUrls: ['./interior-color.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InteriorColorComponent implements OnInit {
  interiorColor:any = null;
  constructor(private carFilters:CarFiltersService) { }

  checkCurrentItem(item,index){
    this.carFilters.interiorColor[index].checked = ! this.carFilters.interiorColor[index].checked;
  }

  ngOnInit() {
    this.interiorColor = this.carFilters.getInteriorColor();
  }

}
