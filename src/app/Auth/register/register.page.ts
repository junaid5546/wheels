import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit,AfterViewInit {
  @ViewChildren(IonInput, {read:ElementRef}) input: IonInput;
  constructor() { }
  
  ngAfterViewInit() {
    
  }

  ngOnInit() {
    
  }

  // ONCE THEY SELECT COUNTRY CODE MAKE LIST OF INPUT __ __ __ __
  // FOCUS ON FIRST __
  // ONCE USER ENTER THE DIGITS MOVE FOCUS TO NEXT __
  // IF BACKSPACE THEN CHECK IF __ HAS NUMBER CLEAR IT IF NOT THEN FOCUS ON PREVIOUS SECTION AND CLEAR THAT

  ionInput(ev) {
    console.log('ionInput',ev);
    ev.srcElement.id
    console.log("id: ", ev.srcElement.id);
    this.input.disabled = true;
    
  }

  ionChange(ev,i){
    console.log('IonChange: ', ev, " index: ", i);
    let doc = document.getElementById(i);
    console.log(doc);
  }

  gotoNextField(nextElement) {
    nextElement.setFocus();
  }


}
