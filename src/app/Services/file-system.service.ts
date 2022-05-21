import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() { }
/**
 * @param object
 */
   readFilePath = async (path:{path:string}) => {

     Filesystem.requestPermissions().then( async (permission)=>{
       console.log("Permission: ", permission);
       if(permission.publicStorage == 'granted') {
        const contents = await Filesystem.readFile(path);
        console.log('data:', contents);
       }
     });
  };

  uploadImages(images){
    
  }
 
}
