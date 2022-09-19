import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DebugerService {

  constructor() { }
  log(name,whatToLog,color,debugging:boolean){
    if(debugging){
    console.log(
      `%c${name}%c`,
      `color: ${color}`,
      `color: ${color}`,// CSS Style
      whatToLog
    );
    } 
  }
}
