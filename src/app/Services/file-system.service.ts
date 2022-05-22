import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { FirebaseService } from '../firebase.service'
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
         console.log(data);
         const resp = await fetch(data);
         const blob = await resp.blob();
         const Blobobj = {blob:null, name:null};
         Blobobj.blob = blob;
         Blobobj.name = name;
         res (Blobobj);
        } else {
          rej (false);
        }
      })
      .catch(err=>{
        return(err);
      })
     });
  };



  
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

 
 
}
