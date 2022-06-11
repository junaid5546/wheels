import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { DmApiService } from 'dm-api';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userId:string = null;
  profileUrl = 'user/public-profile/';

  constructor(private api:DmApiService) { }

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
    this.userId = _id;
    let id = String(_id);
    await Storage.set({
      key: 'user_id', 
      value: id,
    });
   
  }
/**
 * 
 * @returns promise 
 */
  getUserId = async () => {
  let userId = await Storage.get({key:'user_id'});
  this.userId = userId.value;
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

  /**
   * USE THIS TO GET USER ID ANYWHERE
   * @returns userid:string
   */
  fetchUserId(){
    return this.userId;
  }




}
