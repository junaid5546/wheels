import { Injectable } from '@angular/core';
import { UserRegistration } from '../Interface/user';
import { UserDataService } from './user-data.service';
import { ApiService } from '../api.service';
import { Auth,RecaptchaVerifier,signInWithPhoneNumber,ConfirmationResult } from "@angular/fire/auth";
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isExist:boolean = false;
  private isLoggedIn:boolean = false;

  widgidId = null;
  recaptchaVerify;
  confirmationResult:ConfirmationResult;
  otpSent:boolean = false;
  authUrl = 'register/';
  loginUrl = 'sessions';
  getToken = 'token'
  postUrl = 'vehicleForSale/post';
  vehicleMaster = 'master/vehicles/makes';
  existingUser = 'user';

  // REGISTER
  apiRoute: any = {};
  getTokenAccess: any = {};
  refreshToken: any = {};

  constructor(private api:ApiService,private auth:Auth,private userData:UserDataService, private token:TokenService) { }
  
  // CALLING THIS API AT FIRST TO GET TOKEN FOR FURTHER USE IN HEADERS.
  getAuthToken = () => {
    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
      apiRoute.apiroute = `${this.loginUrl}/${this.getToken}`;
      this.api.getToken(apiRoute, 'h1')
          .then((data: any) => {
          this.token.setAccessToken(data.result.accessToken);
              resolve(data);
          })
          .catch((error) => {
              reject(error);
          });
      });
}

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
/**
 * 
 * @param number
 * @returns firebase result
 */
  async signInwithPhoneNumber(number:string) {
  
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
            if(data['code'] === 0){
            // SETTING USER OBJECT
            this.userData.setUserObj(data['result']);
              resolve(data);
            }
          })
          .catch((error) => {
              reject(error);
          });
      });
  }

  /**
   * 
   * @param _areaCode 
   * @param _phoneNumber 
   */

   isUserExist(_areaCode:number,_phoneNumber:number){

    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
      apiRoute.apiroute = `${this.existingUser}?area-code=${_areaCode}&phone-number=${_phoneNumber}`;
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
    console.log("IN LOGIN");
    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
      apiRoute.apiroute = this.loginUrl;
      apiRoute.data = object;
      this.api.post(apiRoute, 'h3')
          .then((data: any) => {
            if(data['code'] === 0){
               // SETTING USER ID
               this.userData.setUserId(data.result.user._id);
               this.token.setAccessToken(data.result.accessToken);
              // SETTING USER OBJECT
              this.userData.setUserObj(data.result.user);
                resolve(data);
              }
              resolve(data);
          })
          .catch((error) => {
              reject(error);
          });
      });
  }

/**
 * 
 * @param booler 
 */
  setIsExist(booler){
    this.isExist = booler;
  }
  /**
   * 
   * @returns boolean
   */
  getIsExist(){
    return this.isExist;
  }
/**
 * 
 * @param code 
 * @returns created user or Error.
 */
 async confirmPin(code){
    let result = await this.confirmationResult.confirm(code);
    return result;
  }

  isAuthenticated():boolean{
    return this.isLoggedIn;
  }



}
