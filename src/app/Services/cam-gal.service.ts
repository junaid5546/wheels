// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

/**
 * ANDROID
 * Use these in AndroidManifest.xml
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
 */

/**
 * IOS
 * use these in info.plist
 * NSCameraUsageDescription (Privacy - Camera Usage Description)
 * NSPhotoLibraryAddUsageDescription (Privacy - Photo Library Additions Usage Description)
 * NSPhotoLibraryUsageDescription (Privacy - Photo Library Usage Description)
 */

import { Injectable } from '@angular/core';
import {
  Camera,
  CameraDirection,
  CameraResultType,
  ImageOptions,
  GalleryImageOptions,
  GalleryPhoto,
  Photo
} from '@capacitor/camera';
import { Image } from '../Interface/image';
import { FileSystemService } from './file-system.service';
import { PermissionsService } from './permissions.service';
import { MediaStorageService } from '../Services/media-storage.service';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class CamGalService {
  // MAXIMUM NUMBER OF IMAGES USER CAN SELECT.
  maximumImages: number = 20;
  // IMAGES COUNT FOR ANDROID.
  imagesCount: number = 0;

  // CAMERA OPTIONS
  private cameraOptions: ImageOptions = {
    quality: 100,
    resultType: CameraResultType.Uri,
    direction: CameraDirection.Rear,
    presentationStyle: 'popover',
    webUseInput: true,
  };
  // GALLERY OPTIONS
  private galleryOptions: GalleryImageOptions = {
    quality: 80,
    correctOrientation: true,
    presentationStyle: 'popover',
    limit: 20,
  };

  constructor(
    private permission: PermissionsService,
    private fileSystem: FileSystemService,
    private storage: MediaStorageService,
    public platform: Platform
  ) {}

  /***
   * THIS FUNCTION TAKES IMAGE FROM CAM AND SENDS YOU DataUrl
   * @author JGS
   * @return {DataUrl}
   *
   */
  captureImage = async () => {
    const takeImage = await Camera.getPhoto(this.cameraOptions);
    console.log('image:', takeImage);
    const image: Image = new Image(
      takeImage.path,
      takeImage.format,
      takeImage.webPath
    );
    return image;
  };

  /**
   * THIS FUNCTION SENDS YOU ARRAY OF SELECTED IMAGES.
   * @returns Array of images/blob()
   *
   */
  getLibraryImages = async () => {
    const images = await Camera.pickImages(this.galleryOptions);
    return images.photos;
  };

  /**
   *
   * @returns file object
   */
  getSingleImage = async (file_name) => {
    let image = null;
    try {
      image = await Camera.getPhoto(this.cameraOptions).then((image) => {
        //let file = this.fileSystem.base64toFile(image, file_name);
        
      console.log('FILE: ', image);
        return {base64:image};
      });
    } catch (e) {
      console.log(e.message);
      switch (e.message) {
        case 'Error loading image':
          break;
        case 'User cancelled photos app':
          break;

        case 'User denied access to photos':
          this.permission.askforPermission({
            'title:': 'Gallery Access',
            sub_title: 'Allow the app to read and write',
            description: 'You can upload pictures and many more',
          });
          break;
      }
    } finally {
      return image;
    }
  };

  // UPLOAD IMAGES TO THE SERVER
  /**
   *
   * @param images File
   */
  async uploadImages(
    images: GalleryPhoto[],
    mediaType: string,
    entity_id: string
  ) {
    console.log('Received images in upload method: ', images);

    let _blobArray: any[] = [];
    for (var i = 0; i < images.length; i++) {
      let file_Name = images[i].path.substring(
        images[i].path.lastIndexOf('/') + 1
      );
      this.imagesCount++;
      if (this.imagesCount <= this.maximumImages) {
        let data: any = await this.fileSystem.readFile(
          { path: images[i].path },
          file_Name
        );
        _blobArray.push(data);
        console.log('DATA', _blobArray);
      } else {
        console.log('BLOB|FILE: ', _blobArray);
        return _blobArray;
      }
    }

    console.log('FILES: ', _blobArray);

    this.storage.uploadMultipleImages(_blobArray, mediaType, entity_id);
  }

  async readAsFile(photo: Photo[]) {
    console.log('PHOTOS: ', photo);
    let files: File[] = [];
    // Fetch the photo, read as a blob, then convert to base64 format
    for (let index = 0; index < photo.length; index++) {
      const response = await fetch(photo[index].webPath);
      const blob = await response.blob();
      let file_Name =
        photo[index].webPath.substring(
          photo[index].webPath.lastIndexOf('/') + 1
        ) +
        '.' +
        photo[index].format;
      const file = new File([blob], file_Name, { type: 'image/jpeg' });
      files.push(file);
    }
    return files;
  }

  /**
   * UPLOAD IMAGES AND RETURN RESPONSE
   * @param files File
   * @param entityId string
   *
   */
  uploadMultipleImages(files: File[], mediaType: string, entityId: string) {
    console.log('FILE: ', files);
    this.storage.uploadMultipleImages(files, mediaType, entityId);
  }

/**
 * CHECKS THE PERMISSION AND RETURNS OBJECT
 * @returns {camera:string, photos:string}
 */
  async checkPermission(){
   const cam_gal_permission = await Camera.checkPermissions();
   return cam_gal_permission;
  }

/**
 * REQUEST FOR THE PHOTOS AND RETURN STRING.
 * @returns string
 */
  requestForPhotosPermission = async () => {
  let result = (await Camera.requestPermissions()).photos;
  return result;
 }

 /**
 * REQUEST FOR THE CAMERA AND RETURN STRING.
 * @returns string
 */
  requestForGalleryPermission = async () => {
  let result = (await Camera.requestPermissions()).camera;
  return result;
 }

}
