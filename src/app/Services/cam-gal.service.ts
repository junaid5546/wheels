import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType,ImageOptions,GalleryImageOptions } from '@capacitor/camera';
import { Image } from '../Interface/image';
@Injectable({
  providedIn: 'root'
})
export class CamGalService {

  private cameraOptions:ImageOptions = {
    quality: 100,
    resultType:CameraResultType.Uri,
    direction:CameraDirection.Rear,
    presentationStyle:'popover',
    webUseInput:true
  };

  private galleryOptions:GalleryImageOptions = {
    quality:100,
    correctOrientation:true,
    presentationStyle:'popover',
    limit:20
  }

  constructor() { }

  /***
   * THIS FUNCTION TAKES IMAGE FROM CAM AND SENDS YOU DataUrl
   * @author JGS
   * @return {DataUrl}
   *  
   */
  captureImage = async () => {
    const takeImage = await Camera.getPhoto(this.cameraOptions);
    console.log("image:", takeImage);
    const image:Image = new Image(takeImage.path,takeImage.format,takeImage.webPath);
    return image;
  }

  getLibraryImages = async () =>{
    const images = await Camera.pickImages(this.galleryOptions);
    console.log("Gallery Images", images.photos);
    let files: File[] = [];
        for (var i = 0; i < images.photos.length; i++) {
        console.log('Image URI: ' + images.photos[i]);
        
       }
  }

}
