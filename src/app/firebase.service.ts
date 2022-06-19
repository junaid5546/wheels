// Copyright 2022 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore, addDoc, setDoc, getDoc, } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, uploadString } from '@angular/fire/storage';
import { collection } from 'firebase/firestore';
import { Observable, Subject } from 'rxjs';
import { UserRegistration } from './Interface/user';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  userId = new Subject<string>();

 constructor(private firestore:Firestore){}



 getAllUsers():Observable<UserRegistration[]> {
   const notesRef = collection(this.firestore, 'users');
   return collectionData(notesRef, { idField:'id'}) as Observable<UserRegistration[]>;
 }

 getSpecificUser(userId):Observable<UserRegistration>{
   const userRef = doc(this.firestore, `notes/${userId}`);
   return docData(userRef, {idField:'id'}) as Observable<UserRegistration>; 
 }


async addNewUser(user:UserRegistration){
  console.log(user);
  let obj = Object.assign({},user);
  console.log(obj);
  try {
        const docRef = await setDoc(doc(this.firestore,'users',''), obj);
          

  } catch (error) {
        console.error("Error adding document: ", error); 
  }
   

 }

 

async uploadImage(blob,imageName){
  const storage = getStorage();
  console.log("STORAGE: ", storage);
  const storageRef = ref(storage, `images/${imageName}`);
  console.log("REF: ", storageRef);
  uploadBytes(storageRef, blob).then((snapshot) => {
  console.log('Uploaded a blob or file!',snapshot);
});
 

}


async getDoc(id:string) {

  const docRef = doc(this.firestore, "users", id);
  
}


}