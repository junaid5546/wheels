import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-exterior-color',
  templateUrl: './exterior-color.component.html',
  styleUrls: ['./exterior-color.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ExteriorColorComponent implements OnInit {
  label:string = null;
  exteriorColors:any = null;
  constructor(private carFilters:CarFiltersService,private activated:ActivatedRoute) { }

  checkCurrentItem(item,index){
    this.carFilters.exteriorColor[index].checked = !this.carFilters.exteriorColor[index].checked;
    this.carFilters.filterObject[this.label].push(item.name);
  }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    console.log("On init called exterior color");
    this.exteriorColors = this.carFilters.getExteriorColor();
  }
}
