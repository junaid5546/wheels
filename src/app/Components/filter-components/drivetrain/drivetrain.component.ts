import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-drivetrain',
  templateUrl: './drivetrain.component.html',
  styleUrls: ['./drivetrain.component.scss'],
})
export class DrivetrainComponent implements OnInit {
  label:string = null;
  drivtrain:any = null;
  constructor(private filter:CarFiltersService,private activated:ActivatedRoute) { }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.drivtrain = this.filter.getDrivTrain();
  }

  check(item,i){
    this.filter.driveTrain[i].checked = !this.filter.driveTrain[i].checked;
    this.filter.filterObject[this.label].push(item.name);
  }


}
