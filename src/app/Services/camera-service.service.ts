import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { PermissionsService } from './permissions.service';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
@Injectable({
  providedIn: 'root'
})
export class CameraServiceService {

  constructor(private permission: PermissionsService,private filePath: FilePath, private webview: WebView , private sanitizer:DomSanitizer) { }

// TAKING IMAGE FROM CAMERA AND RETURN URL.
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source:CameraSource.Photos,
      resultType: CameraResultType.DataUrl
    });
    let imageUrl = image;
    return imageUrl;
  };

  // PICK MULTIPLE IMAGES FROM GALLERY AND RETURN ARRAY OF IMAGES. 
  pickImages = async () => {
    let image = null;
   try{
     image = await Camera.pickImages({
      quality:90,
      presentationStyle:'fullscreen',
      correctOrientation:true
    });
    // THIS IMAGESBOX ARRAY WILL CONTAIN ALL IMAGES THAT ARE FETCH FROM GALLERY.
     
     image =  image.photos.map(x=>{
        let imageObject = {webPath:null, format:'', path:null, check:'abc'};
        imageObject.webPath = this.sanitizer.bypassSecurityTrustResourceUrl(this.webview.convertFileSrc(x.webPath));
        imageObject.format = x.format;
        imageObject.path = this.sanitizer.bypassSecurityTrustResourceUrl(this.webview.convertFileSrc(x.path));
        console.log("Changing objects");
        return imageObject;
      });
    }
      catch (e){
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
        console.log("IMAGE: ", image);
        return image;
      }
      
  }
  
  



}
