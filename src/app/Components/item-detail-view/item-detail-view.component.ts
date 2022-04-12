import { Component, OnInit } from '@angular/core';
import {DeviceInfoService} from '../../Services/device-info.service';
import { ModalControllerService } from '../../Services/modal-controller.service';
@Component({
  selector: 'app-item-detail-view',
  templateUrl: './item-detail-view.component.html',
  styleUrls: ['./item-detail-view.component.scss'],
})
export class ItemDetailViewComponent implements OnInit {
  images = [
    {orientation:1,name:'https://media.istockphoto.com/photos/new-red-metallic-sedan-car-in-spotlight-modern-desing-brandless-picture-id907671134?k=20&m=907671134&s=612x612&w=0&h=Ou3tRuqqNDZST71JKzTq4QR9KxsohTTkVCbs158WEco='},
    {orientation:1,name:'../../../assets/images/00-mercedes-benz-eq-concept-cars-2560x1440.webp'},
    {orientation:1,name:'https://media.istockphoto.com/photos/illustration-of-generic-compact-car-perspective-view-picture-id1148853697?k=20&m=1148853697&s=612x612&w=0&h=x_IL5R5PF48fTZhuD-1gMHDqstoxyrUfRMH-Oet-7Mk='},
    {orientation:1,name:'https://media.istockphoto.com/photos/new-red-metallic-sedan-car-in-spotlight-modern-desing-brandless-picture-id907671134?k=20&m=907671134&s=612x612&w=0&h=Ou3tRuqqNDZST71JKzTq4QR9KxsohTTkVCbs158WEco='},
    {orientation:1,name:'../../../assets/images/00-mercedes-benz-eq-concept-cars-2560x1440.webp'},
    {orientation:0,name:'../../../assets/images/00-mercedes-benz-eq-concept-cars-2560x1440 copy.png'},
    {orientation:1,name:'https://media.istockphoto.com/photos/new-red-metallic-sedan-car-in-spotlight-modern-desing-brandless-picture-id907671134?k=20&m=907671134&s=612x612&w=0&h=Ou3tRuqqNDZST71JKzTq4QR9KxsohTTkVCbs158WEco='},
    {orientation:1,name:'../../../assets/images/00-mercedes-benz-eq-concept-cars-2560x1440.webp'},]
  constructor(public deviceInfo:DeviceInfoService, private imageModalPreviewer:ModalControllerService) { }

  ngOnInit() {}

  previewImage(){
    this.imageModalPreviewer.presentImagePreviewModal(this.images);
  }
  
  slideTapClicked(e){
    console.log('Event: ', e);
    this.previewImage();
  }
}

