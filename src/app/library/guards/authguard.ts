import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()

export class AuthGuard implements CanActivate {
  refreshToken = null;
  constructor(
    public router: Router
  ) {}


  //   CanActivate  ( checking route access )
  //   CanActivateChild ( checking child route access )
  //   CanDeactivate ( ask permission to discard unsaved changes )
  //   Resolve ( pre-fetching route data )
  //   CanLoad (check before loading feature module assets )


  canActivate() {
    
    let allDetails = JSON.parse(localStorage.getItem('LoginResponceToken'));
    if ( allDetails ) {
      this.refreshToken = allDetails.refresh_token;
      const token = allDetails.access_token;
      // console.log('token', token);
      const helper = new JwtHelperService();
      // console.log('helper service', helper);
      const decodedToken = helper.decodeToken(token);
      // console.log('decodedToken-->>' , decodedToken);
      const expirationDate = helper.getTokenExpirationDate(token);
      // console.log('expirationDate -->>' , expirationDate);
      const isExpired = helper.isTokenExpired(token);
      const isRefreshTokenExpired = helper.isTokenExpired(this.refreshToken);
      const expirationDateTime = Math.floor(new Date(expirationDate).getTime() / 1000);
      // console.log('expirationDateTime -->>' , expirationDateTime);
      const expirationDateInBuffer = new Date(expirationDate);
      expirationDateInBuffer.setMinutes( expirationDateInBuffer.getMinutes() - 5 );
      // console.log('expirationDateInBuffer -->>' , expirationDateInBuffer);
      const expirationDateInBufferTime = Math.floor(new Date(expirationDateInBuffer).getTime() / 1000);
      // console.log('expirationDateInBufferTime' , expirationDateInBufferTime);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      // console.log('currentTime-->>' , currentTime);
      // Token is about to expire then call refresh token api

      // console.log('currentTime < expirationDateInBufferTime' , currentTime < expirationDateInBufferTime);
      // console.log('currentTime >= expirationDateInBufferTime' , currentTime >= expirationDateInBufferTime);

      // if ( currentTime < expirationDateInBufferTime ) {
      /*if ( currentTime >= expirationDateInBufferTime ) {
        // console.log('isRefreshTokenExpired', isRefreshTokenExpired);
        this.authApiService
        .getRefreshToken(this.refreshToken)
        .then(refreshed => {
          // Let them continue
        }).catch(err => {
          console.log(err);
            this.toastService.presentToast(err.error.error_description)
            if(err.error.error_description == 'Invalid refresh token' || 'Token is not active'){
              localStorage.clear()
              this.router.navigate(['yuzee-welcome']);
            }
        })
      }*/
      return true;
    } else {
      return true;
    }
  }
}