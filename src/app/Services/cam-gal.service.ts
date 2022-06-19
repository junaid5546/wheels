// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */
import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType,ImageOptions,GalleryImageOptions } from '@capacitor/camera';
import { Image } from '../Interface/image';
import { FileSystemService } from './file-system.service';
import { PermissionsService } from './permissions.service';
import { StorageService } from 'dm-api';
@Injectable({
  providedIn: 'root'
})
export class CamGalService {
  // MAXIMUM NUMBER OF IMAGES USER CAN SELECT.
  maximumImages:number = 20;
  // IMAGES COUNT FOR ANDROID.
  imagesCount:number = 0;
  
  // CAMERA OPTIONS
  private cameraOptions:ImageOptions = {
    quality: 100,
    resultType:CameraResultType.DataUrl,
    direction:CameraDirection.Rear,
    presentationStyle:'popover',
    webUseInput:true

  };
  // GALLERY OPTIONS
  private galleryOptions:GalleryImageOptions = {
    quality:100,
    correctOrientation:true,
    presentationStyle:'popover',
    limit:20
  }

  constructor(private permission: PermissionsService,private fileSystem:FileSystemService, private storage:StorageService) { }

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
  /**
   * THIS FUNCTION SENDS YOU ARRAY OF SELECTED IMAGES.
   * @returns Array of images/blob()
   * 
   */
  getLibraryImages = async () =>{
    const images = await Camera.pickImages(this.galleryOptions);
        let _blobArray:any[] = [];
        for (var i = 0; i < images.photos.length; i++) {
        let file_Name = images.photos[i].path.substring(images.photos[i].path.lastIndexOf("/") + 1);
        this.imagesCount++;
          if(this.imagesCount <= this.maximumImages ) {
       let data = await this.fileSystem.readFile({path:images.photos[i].path},file_Name);
          data["photo"] =  images.photos[i];
          _blobArray.push(data);
        } else {
          return _blobArray;
        }
       }
       return _blobArray;
       
  }

  /**
   * 
   * @returns file object
   */
  getSingleImage = async () =>{
   
    let image = null;
    try {
    image = await Camera.getPhoto(this.cameraOptions)
    .then((image)=>{
   let file =   this.fileSystem.base64toFile(image,'profile');
   console.log("FILE: ", file);
   return file;
    })
    } catch (e){
      console.log(e.message);
      switch (e.message) {
        case "Error loading image":
          break;
          case "User cancelled photos app":
          break;

        case "User denied access to photos":
          this.permission.askforPermission({
            'title:':'Gallery Access',
            'sub_title':'Allow the app to read and write',
            'description':'You can upload pictures and many more'
          })
          break;
      }
      
    }  finally{
      return image;
    }
  }

  

}
