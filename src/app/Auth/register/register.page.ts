import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, QueryList, ViewChildren,AfterContentInit } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit {

  @ViewChild(IonInput, {static:false}) input: IonInput;

  constructor() { }


  ngAfterViewInit() {
    console.log("Input ele",this.input);
    this.input.setFocus();
    //this.input.autofocus = true;

  }

  



  ngOnInit() {
    
  }

  // ONCE THEY SELECT COUNTRY CODE MAKE LIST OF INPUT __ __ __ __
  // FOCUS ON FIRST __
  // ONCE USER ENTER THE DIGITS MOVE FOCUS TO NEXT __
  // IF BACKSPACE THEN CHECK IF __ HAS NUMBER CLEAR IT IF NOT THEN FOCUS ON PREVIOUS SECTION AND CLEAR THAT

  

  ionChange(ev,i){
    console.log('IonChange: ', ev, " index: ", i);
    let doc = document.getElementById(i);
    console.log(doc);
  }

  gotoNextField(current,nextElement,prev, key) {
    console.log("Element: ", current);
    if(key.keyCode != 8) {

      console.log(current.value, typeof(current.value));
      console.log("Key", key);
      nextElement.setFocus();
    } else {
      prev.setFocus();  
    }
   
  }

  selectCountryCode(code,input){
    console.log('Input', this.input);
    input.setFocus()
  }

  validate(ev) {
    console.log('')
  }
 
}
