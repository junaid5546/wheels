// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaStorageService {
 // fileTransfer: FileTransferObject = this.transfer.create();
  //constructor(private transfer: FileTransfer) { }




  /*uploadEntityFile(entityObj) {
    console.log(" ==== Upload Parameter ===", entityObj);
    
    return new Promise((resolve, reject) => {
      var currentName = entityObj.file.substr(entityObj.file.lastIndexOf("/") + 1);
      console.log(currentName)
      setTimeout(() => {
        let options: FileUploadOptions = {
          fileKey: "file",
          fileName: currentName,
          chunkedMode: false,
          mimeType: "multipart/form-data",
          
          params: {
            file: entityObj.file,
            userId: entityObj.entity_id,
          },
        };
        console.log("FileUploadOptions Option with parameter >>>>> ", options)
        
        this.fileTransfer.upload(entityObj.file, "http://45.79.249.189/dm/api/vehicleForSale/post", options)
          .then(
            (data) => {
              console.log(" === file uploading successfully == ", data);
              alert("file upload successfully")
              entityObj = {}
              resolve(data);
            },
            (err) => {
              console.log(err, "======= File uploading");
              entityObj = {}
              reject(err)
            }
          );
      }, 500);
    });
  }*/
}
