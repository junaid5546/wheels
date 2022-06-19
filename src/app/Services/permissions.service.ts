// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Injectable } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AskPermissionComponent } from '../Components/Shared/ask-permission/ask-permission.component';
import { Camera } from '@capacitor/camera';
@Injectable({
  providedIn: 'root'
})

export class PermissionsService {

  public gallery:string = null;
  constructor(public modalController: ModalController) {

   let galleryPermission =  localStorage.getItem('gallery_permission');
   console.log("Gallery Permissions are: ", galleryPermission);
   if(galleryPermission == null || galleryPermission == undefined){
     this.gallery = null;
   } else {
     this.gallery = galleryPermission;
   }
   }

  async askforPermission(props) {

    const modal = await this.modalController.create({
      component: AskPermissionComponent,
      animated:true,
      cssClass: 'my-custom-class',
      componentProps: props,
      showBackdrop:true,
      backdropDismiss:true,
      swipeToClose:true,
      breakpoints:[0.1,0.5,0.8],
      initialBreakpoint:0.8,
      presentingElement:document.getElementById('ion-router-outlet-content')
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log("Modal closed");
      if (dataReturned !== null) {
        if(dataReturned.data != undefined){
          console.log("Modal Data: ", dataReturned.data);
        }
      }
    });
    return await modal.present();
    
  
  }


  // REQUEST FOR CAMERA/GALLERY AND RETURN AN OBJECT.
  checkCameraPermission =  () => {
    return new Promise(async res=>{
     let permission = await Camera.checkPermissions();
    
     switch (permission.photos) {
       case 'granted':
         localStorage.setItem('gallery_permission','granted');
         res({permission:'Granted',value:0} );
         break;
 
         case 'limited':
          localStorage.setItem('gallery_permission','limited');
           res({permission:'limited',value:1} );
           // ASK FOR MORE OR CHOOSE FROM SELECTED OPTION
           break;
 
           case 'denied':
            localStorage.setItem('gallery_permission','denied');
             res({permission:'denied',value:-1} );
             this.askforPermission({
               'title:':'Gallery Access',
               'sub_title':'Allow the app to read and write',
               'description':'You can upload pictures and many more'
             })
             // ASK FOR ALLOW PERMISSION FOR CAMERA AND GALLERY
             break;
     
       default:
        localStorage.setItem('gallery_permission','not-asked');
         res({permission:'default',value:-0} )
         break;
     }
     
    });
     
   }

   // REQUEST FOR GALLERY PERMISSION 
   requestPermission =  ()  => {
      Camera.requestPermissions()
      .then((res)=>{
        console.log("res", res);
      })
   }

}