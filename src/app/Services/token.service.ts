import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token:string = null;

  constructor() { }

  /**
   * 
   * @returns token
   */
  getAccessToken = async () =>{
    return new Promise( async (resolve, reject) => {
      let token = await Storage.get({key:'dm_token'});
      this.token = token.value;
      if(token.value != null){
        resolve (true);
      } else {
        reject(false);
      }
   });
  }

  /**
   * 
   * @param token 
   */
  setAccessToken = async(token:string) => {
    console.log("TOKEN SETTING: ",token);
    let tkn = String(token);
    this.token = tkn;
    console.log("TOKEN Variable: ", this.token);
    await Storage.set({
      key: 'dm_token', 
      value: tkn,
    });
  }

  

}
