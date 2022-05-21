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
  authUrl = 'register/';
  postUrl = 'vehicleForSale/post';
  existingUser = 'user';

  constructor(private apiService:ApiService, private auth:Auth) {
    
   
 
   }

   
   recaptcha(){
     console.log("called");
    
     this.recaptchaVerify  =new RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("Recaptcha: ",response);
        //this.signInwithPhoneNumber();
      }
    }, this.auth);

    this.recaptchaVerify.render().then((widgetId) => {
      this.widgidId = widgetId;
      console.log("ID:", this.widgidId);
    });
    
   }

   async signInwithPhoneNumber() {
     console.log("Method called" , this.recaptchaVerify);

    signInWithPhoneNumber(this.auth, "+96897022005", this.recaptchaVerify)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      this.confirmationResult = confirmationResult;
      console.log("confirmationResult", this.confirmationResult);
      confirmationResult.confirm('111222')
      .then((resp)=>{
        console.log("Response: ", resp);
      })
      .catch((error=>{
        console.log("error while confirming", error);
      }))
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log("SignIn error: ",error);
      //this.recaptchaVerify.reset(this.widgidId);
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

isUserExist(countryCode:string,phoneNumber:string){

  const apiRoute: any = {};
  return new Promise((resolve, reject) => {
    apiRoute.apiroute = `${this.existingUser}?areaCode=${countryCode}&phoneNumber=${phoneNumber}`;
    this.apiService
      .get(apiRoute, 'h3')
      .then((data: any) => {
        resolve(data);
      })
      .catch((error) => {
        console.log('Error getting service', error);
        reject(error);
      });
  });
}






}
