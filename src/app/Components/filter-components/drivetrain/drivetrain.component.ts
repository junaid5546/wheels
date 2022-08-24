import { Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
@Component({
  selector: 'app-drivetrain',
  templateUrl: './drivetrain.component.html',
  styleUrls: ['./drivetrain.component.scss'],
})
export class DrivetrainComponent implements OnInit {
  drivtrain:any = null;
  constructor(private filter:CarFiltersService) { }

  ngOnInit() {
    this.drivtrain = this.filter.getDrivTrain();
  }

  check(i){
    this.filter.driveTrain[i].checked = !this.filter.driveTrain[i].checked;
  }


}
