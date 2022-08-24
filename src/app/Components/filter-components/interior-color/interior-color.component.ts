import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-interior-color',
  templateUrl: './interior-color.component.html',
  styleUrls: ['./interior-color.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class InteriorColorComponent implements OnInit {
  label:string = null;
  interiorColor:any = null;
  constructor(private carFilters:CarFiltersService,private activated:ActivatedRoute) { }

  checkCurrentItem(item,index){
    this.carFilters.interiorColor[index].checked = ! this.carFilters.interiorColor[index].checked;
    this.carFilters.filterObject[this.label].push(item.name);
  }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.interiorColor = this.carFilters.getInteriorColor();
  }

}
