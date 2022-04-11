import { Component, OnInit } from '@angular/core';
import {DeviceInfoService} from '../../Services/device-info.service';
@Component({
  selector: 'app-item-detail-view',
  templateUrl: './item-detail-view.component.html',
  styleUrls: ['./item-detail-view.component.scss'],
})
export class ItemDetailViewComponent implements OnInit {

  constructor(public deviceInfo:DeviceInfoService) { }

  ngOnInit() {}

}
