import { Injectable } from '@angular/core';
import { Firebase } from '@awesome-cordova-plugins/firebase/ngx';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseAuthentication } from '@awesome-cordova-plugins/firebase-authentication/ngx';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  
  constructor(private firebase: Firebase, private auth:AngularFireAuth, private firestore:AngularFirestore,private firebaseAuthentication: FirebaseAuthentication) { }

  getFirebaseToken(){
  
    this.firebase.getToken()
    .then((token)=>{
      console.log("Token is: ",token);
    })
    .catch(error=>{
      console.log("Error getting token", error);
    })
  
  }


  loginWithPhone(){

    const auth = getAuth();
    this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    signInWithPhoneNumber(auth,"+96897022005",this.recaptchaVerifier)
    .then((confirmationResult)=>{
      console.log("Sms sent",confirmationResult);
    })
    .catch((error)=>{
      console.log("Error sending sms",error);
    });

  }

}