import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  
  

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
    console.log(typeof(id), id);
    await Storage.set({
      key: 'userid', 
      value: id,
    }).then((value)=>{
      console.log("Set value", value);
    })
    .catch((error)=>{
      console.log("Error occured setting id", error);
    })
   
  }
/**
 * 
 * @returns promise 
 */
  getUserId = async () => {
  let userId = await Storage.get({key:'userid'});
  return userId;
  }


}
