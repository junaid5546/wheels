import { Injectable } from '@angular/core';
import { UserRegistration } from '../Interface/user';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../api.service';
import { Auth,RecaptchaVerifier,signInWithPhoneNumber,ConfirmationResult } from "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isExist:boolean = false;
  widgidId = null;
  recaptchaVerify;
  confirmationResult:ConfirmationResult;
  otpSent:boolean = false;
  authUrl = 'register/';
  loginUrl = 'sessions'
  postUrl = 'vehicleForSale/post';
  vehicleMaster = 'master/vehicles/makes';
  existingUser = 'user';

  // REGISTER
  apiRoute: any = {};
  getTokenAccess: any = {};
  refreshToken: any = {};

  constructor(private api:ApiService,private auth:Auth) { }
  recaptcha(){
    console.log("called");
   
    this.recaptchaVerify  =new RecaptchaVerifier('recaptcha-container', {
     'size': 'invisible',
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

  async signInwithPhoneNumber(number) {
  
  let result = await signInWithPhoneNumber(this.auth, "+96897022005", this.recaptchaVerify);
  this.confirmationResult = result;
    return result;
  }

  /**
   * 
   * @param userObj 
   * 
   */
  registerNewUser(userObj:UserRegistration){
    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
      apiRoute.apiroute = this.authUrl;
      apiRoute.data = userObj;
      this.api.post(apiRoute, 'h3')
          .then((data: any) => {
              resolve(data);
          })
          .catch((error) => {
              reject(error);
          });
      });
  }

  /**
   * 
   * @param _userObj
   */
   setUserObj = async (_userObj) => {
    await Storage.set({
      key: '$user_object$',
      value: JSON.stringify(_userObj),
    });
  };

  /**
   * 
   * @param _areaCode 
   * @param _phoneNumber 
   */

   isUserExist(_areaCode:number,_phoneNumber:number){

    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
      apiRoute.apiroute = `${this.existingUser}?areaCode=${_areaCode}&phoneNumber=${_phoneNumber}`;
      this.api
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

/**
 * @param object: {phone:{areaCode:number,phoneNumber:number},dob:number}
 * 
 */
  login(object) {
    
    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
      apiRoute.apiroute = this.loginUrl;
      apiRoute.data = object;
      this.api.post(apiRoute, 'h3')
          .then((data: any) => {
              resolve(data);
          })
          .catch((error) => {
              reject(error);
          });
      });
  }

 /***
  * 
  * @param _userId: @type string
  */
  getUserSession(_userId){

  }



  setIsExist(booler){
    this.isExist = booler;
  }
  
  getIsExist(){
    return this.isExist;
  }

 async confirmPin(code){
    let result = await this.confirmationResult.confirm(code);
    return result;
  }
}
