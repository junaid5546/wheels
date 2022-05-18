import { Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore, addDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { UserRegistration } from './Interface/user';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

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
        const docRef = await addDoc(collection(this.firestore,'users'), obj);
        console.log("Document written with ID: ", docRef.id);

  } catch (error) {
        console.error("Error adding document: ", error); 
  }
   

 }





}