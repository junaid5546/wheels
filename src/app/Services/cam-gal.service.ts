import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType,ImageOptions,GalleryImageOptions } from '@capacitor/camera';
import { Image } from '../Interface/image';
import { FileSystemService } from './file-system.service';

@Injectable({
  providedIn: 'root'
})
export class CamGalService {
  maximumImages:number = 20;
  imagesCount:number = 0;

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

  constructor(private fileSystem:FileSystemService) { }

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
        let _blobArray:any[] = [];
        for (var i = 0; i < images.photos.length; i++) {
        let file_Name = images.photos[i].path.substring(images.photos[i].path.lastIndexOf("/") + 1);
        this.imagesCount++;
          if(this.imagesCount <= this.maximumImages ){
       let data = await this.fileSystem.readFile({path:images.photos[i].path},file_Name);
          data["photo"] =  images.photos[i];
          _blobArray.push(data);
        } else {
          // do nothing and quit
          return _blobArray;
        }
       }
       return _blobArray;
       
  }


  

}
