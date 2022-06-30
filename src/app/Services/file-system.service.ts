// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FirebaseService } from '../firebase.service';
import * as watermark from 'watermarkjs';
@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
 
  constructor(private firebase:FirebaseService) { }


/**
 * @param object
 * @param name
 */
   readFile = async (path:{path:string}, name:string) => {
     return new Promise((res,rej)=>{
      Filesystem.requestPermissions().then( async (permission)=>{
        console.log("Permission: ", permission);
        if(permission.publicStorage == 'granted') {
         const contents = await Filesystem.readFile(path);
        
         let data = `data:image/jpeg;base64,${contents.data}`;
         const resp = await fetch(data);
         const blob = await resp.blob();
       
      let waterMarkedImage = await  watermark([blob, '../../assets/company-logo-default.png'])
      .image(watermark.image.upperLeft(0.5))
      .then(img => {
      return img.src
      });
      console.log("WATERMARKED DATA: ", waterMarkedImage);
      const respWaterMarked = await fetch(waterMarkedImage);
      const blobWaterMarked = await respWaterMarked.blob();
      const file = new File([blobWaterMarked], name,{ type: "image/png" })
      res(file);

         
         
         //const Blobobj = {blob:null, name:null};
         //Blobobj.blob = blob;
         //Blobobj.name = name;
         //res (fileObj);

        } else {
          //rej (false);
        }
      })
      
      .catch(err=>{
        return(err);
      })

     });
  };

addImageWatermark(image, file_name) {
    
  }

  addTextWatermark(image) {
    watermark([image])
      .image(watermark.text.center('DM', '260px Arial', '#fff', 0.5))
      .then(img => {
        return img.src;
      });
  }


  /**
 * Take base64 and convert it into file.
 * @param dataurl base64 
 * @param filename string
 * @returns File
 */
   base64toFile(dataurl, filename) {
    console.log('url:', dataurl.dataUrl);
    var arr = dataurl.dataUrl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    let image =  new File([u8arr], filename, {type:mime});
    return image;
}


  /*async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;
 
      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
 
      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }*/

 readFileNew(){
  
 }
 
}
