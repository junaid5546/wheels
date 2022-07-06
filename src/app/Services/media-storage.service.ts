// Copyright 2022 Google LLC
/**
 * (Type docs)
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Injectable } from '@angular/core';
import { StorageService } from 'dm-api';
@Injectable({
  providedIn: 'root'
})
export class MediaStorageService {

  constructor(private storage:StorageService){}

  /**
   *  UPLOADS SINGLE IMAGE
   * @param file File
   * @param entityId string
   */
  uploadSingleImage(file:File, file_name, entityId:string){
    const formData: FormData = new FormData();
    formData.append('mediaList', file, `${file_name}.${file.type.split('/')[1]}`);
  }

  /**
   * UPLOADS MULTIPLE IMAGES
   * @param file File
   * @param entityId string
   */
  uploadMultipleImages(file:File[],media_type,entityId){
    console.log("UPLOAD IMAGE CALLED");
    const formData: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      console.log("FIle name: ", file[i].name);
      formData.append('mediaList', file[i], file[i].name);
    }
    
      this.storage.uploadEntity(formData, media_type, entityId)
      .then((response)=>{
        console.log("File Upload Response", response);
      })
  }

}
