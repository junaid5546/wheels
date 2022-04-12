import {  Component, ElementRef, Input, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Gesture, GestureController } from '@ionic/angular';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { ModalController } from '@ionic/angular';
// import Swiper core and required modules
import SwiperCore, { SwiperOptions,Pagination,Zoom,FreeMode,Mousewheel, Swiper } from 'swiper';
SwiperCore.use([Pagination,Zoom,FreeMode,Mousewheel])
@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit,AfterViewInit {
  @ViewChild("Swiper",{read:ElementRef}) element: ElementRef;
  config: SwiperOptions = {
    zoom:true,
    slidesPerView:3,
    spaceBetween: 10,
    navigation: false,
    freeMode:true,
    direction:"vertical",
    mousewheel:true
  };

  onSwiper([swiper]) {
    console.log(swiper);
  }

  onSlideChange() {
    console.log('slide change');
  }

  @Input() dataArray:any[] = null;
  constructor(private nav:NavParams,private gestureCtrl: GestureController, private modal:ModalController) { 
    
  }
  ngAfterViewInit()  {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.element.nativeElement,
      threshold: 15,
      direction:'y',
      gestureName: 'my-gesture',
      onMove: ev=>{
        console.log("START",ev)
      },
      onEnd: ev=>{
        console.log("Start",ev);
        console.log("END",ev);
        if(ev.currentY > ev.startY){
       //this.modal.dismiss();
      }
      },
    
    }, true);

    gesture.enable(true);

  }

  ngOnInit() {
    this.dataArray = this.nav.get("dataArray");
    console.log("ARRAY DATA: ", this.dataArray);
  }

  backPress(){
    this.modal.dismiss();
  }


}
