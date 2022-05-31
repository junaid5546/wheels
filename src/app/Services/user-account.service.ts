import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})

export class UserAccountService {
  
  accountsUrl = 'user'
  constructor(private api:ApiService) { }

/**
 * 
 * @param userId 
 * @returns user account object
 */
    getPublicAccount = (userId:string) => {
      const apiRoute: any = {};
      return new Promise((resolve, reject) => {
        apiRoute.apiroute = `${this.accountsUrl}/public-profile/${userId}`;
        this.api.get(apiRoute, 'h3')
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
 * @param userId 
 * @returns user account object
 */
   getPrivateAccount = (userId:string) => {
    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
      apiRoute.apiroute = `${this.accountsUrl}/public-private/${userId}`;
      this.api.get(apiRoute, 'h3')
          .then((data: any) => {
              resolve(data);
          })
          .catch((error) => {
              reject(error);
          });
      });
}

}
