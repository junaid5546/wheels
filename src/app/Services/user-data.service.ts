import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { ApiService } from '../api.service';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  profileUrl = 'user/public-profile/';

  constructor(private api:ApiService) { }

  /**
   * 
   * @param _userObj
   */
   setUserObj = async (_userObj) => {
     console.log("USER OBJ IN SET:",_userObj );
     let obj = JSON.stringify(_userObj);
   let setObj =  await Storage.set({
      key: 'userObj',
      value: obj,
    });
    return setObj;
  };

/**
 * 
 * @returns promise
 */
  getUserObj = async () => {
    let userObject = await Storage.get({key:'userObj'});
    return userObject;
  }
/**
 * 
 * @param _id 
 * @returns promise
 */
  setUserId = async (_id) => {
    let id = String(_id);
    await Storage.set({
      key: 'userid', 
      value: id,
    });
   
  }
/**
 * 
 * @returns promise 
 */
  getUserId = async () => {
  let userId = await Storage.get({key:'userid'});
  return userId;
  }

/**
 * 
 * @param userId 
 */
  getUserPublicProfile(userId:string) {
    
    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
      apiRoute.apiroute = `${this.profileUrl}628e5e82ea2c9d0a66732e9b`;
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





}
