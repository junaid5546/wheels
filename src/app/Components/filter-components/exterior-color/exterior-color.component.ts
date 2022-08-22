import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-exterior-color',
  templateUrl: './exterior-color.component.html',
  styleUrls: ['./exterior-color.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ExteriorColorComponent implements OnInit {
  exteriorColors:any = null;
  constructor(private carFilters:CarFiltersService) { }

  checkCurrentItem(item,index){
    this.carFilters.exteriorColor[index].checked = !this.carFilters.exteriorColor[index].checked;
  }

  ngOnInit() {
    console.log("On init called exterior color");
    this.exteriorColors = this.carFilters.getExteriorColor();
  }
}
