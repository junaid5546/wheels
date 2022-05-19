import { Injectable } from '@angular/core';
import { UserRegistration } from './Interface/user';
import { ApiService } from './api.service';
import { Auth,RecaptchaVerifier,signInWithPhoneNumber } from "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  widgidId = null;
  recaptchaVerify;
  confirmationResult;
  otpSent:boolean = false;
  authUrl = 'register';
  existingUser = 'user';
  appBaseUrl = 'http://45.79.249.189/dm/api/';

  constructor(private apiService:ApiService, private auth:Auth) {
    
   
 
   }

   
   recaptcha(){
     console.log("called");
    
     this.recaptchaVerify  =new RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("Recaptcha: ",response);
        this.signInwithPhoneNumber();
      }
    }, this.auth);

    this.recaptchaVerify.render().then((widgetId) => {
      this.widgidId = widgetId;
    });
    
   }



   async signInwithPhoneNumber() {
     console.log("Method called");
    signInWithPhoneNumber(this.auth, "+96897022005", this.recaptchaVerify)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      this.confirmationResult = confirmationResult;
      console.log("confirmationResult", this.confirmationResult);
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log("SignIn error: ",error);
      this.recaptchaVerify.reset(this.widgidId);
    });
   }

  createUser(userObj:UserRegistration) {
    console.log("Creating user");
    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
    apiRoute.apiroute = this.authUrl;
    apiRoute.data = userObj;
    this.apiService.post(apiRoute, 'h3')
        .then((data: any) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

checkExistingUser(obj:UserRegistration) {
  
}

isUserExist(userObj:UserRegistration){

  const apiRoute:any = {};
  return new Promise((resolve,reject)=>{

    let object = {phone:{areaCode:0,phoneNumber:0}};
    object.phone.areaCode  = userObj.primaryPhone.areacode;
    object.phone.phoneNumber  = userObj.primaryPhone.phoneNumber;

    apiRoute.apiroute = `${this.authUrl}/${this.existingUser}`;
    apiRoute.data = object;
    this.apiService.post(apiRoute,'h3')

      .then((data:any)=>{
          resolve(data);
      })
      .catch((error)=>{

          reject(error);
      });
  });
}

}
