// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { DmApiService } from 'dm-api';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  language:string = 'en';
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
    console.log("SETTING USER ID: ", _id);
    this.userId = _id;
    let id = String(_id);
    await Storage.set({
      key: 'user_id', 
      value: id,
    });
   
  }



  /**
 * 
 * @param number 
 * @returns promise
 */
   setBusinessPhone = async (number:string) => {
    await Storage.set({
      key: 'business_phone', 
      value: number,
    });
   
  }


  /**
 * 
 * @param number 
 * @returns promise
 */
   setPrimaryPhone = async (number:string) => {
    await Storage.set({
      key: 'primary_phone', 
      value: number,
    });
   
  }

  getPhonePrimary = async () => {
    let phone = await Storage.get({key:'primary_phone'});
    let business_phone = phone.value;
    return business_phone;
  }

  getPhoneBusiness = async () => {
    let phone = await Storage.get({key:'business_phone'});
    let business_phone = phone.value;
    return business_phone;
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
   * USE THIS TO GET USER ID ANYWHERE
   * @returns userid:string
   */
  fetchUserId(){
    return this.userId ?? '628e5e82ea2c9d0a66732e9b';
  }

  /**
   * CHECKS THE SIGN IN STATUS AND RETURN BOOLEAN VALUE.
   * @returns boolean
   */
  async isSignedIn(){
    let userId = await Storage.get({key:'user_id'}); // '628e5e82ea2c9d0a66732e9b' | ''
    if(userId.value){
      return true;
    } else {
      return false;
    }
  }
}
