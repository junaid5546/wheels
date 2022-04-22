import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, QueryList, ViewChildren,AfterContentInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit {
   seconds = 60;
  isOtpDisabled:boolean = false;
  buttonText:string = "Send OTP";
  countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
  private selectedAnimal: string;
  constructor(private pickerController: PickerController) { }
  @ViewChild(IonInput, {static:false}) input: IonInput;


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
 

  // DATE TIME PICKER
  async presentPicker() {
    const picker = await this.pickerController.create({
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            //nothing
          },
        },
        {
          text: 'Confirm',
          handler: (selected) => {
            console.log(selected);
            //this.selectedAnimal = selected.day.value;
          },
        }
      ],
      columns: [
        {
          name: 'day',
          options: [
            { text: '1', value: 'Sunday' },
            { text: '2', value: 'Monday' },
            { text: '3', value: 'Tuesday' },
          ]
        },
        {
          name:'month',
          options:[{text:'Jan', value:'1'},{text:'Feb',value:"2"},{text:"Mar",value:'3'}]
        },
        {
          name:'Year',
          options:[{text:'2001', value:'2001'},{text:'2002',value:"2002"},{text:"2003",value:'2003'}]
        },
      ],
      animated:true,
      
    });
    await picker.present();
  }

  sendOTP() {
    let x = setInterval(()=> {

      // Get today's date and time
      let now = new Date().getTime();
      this.isOtpDisabled = true;
      // Find the distance between now and the count down date
      let distance = this.countDownDate - now;
    
      // Time calculations for days, hours, minutes and seconds
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Display the result in the element with id="demo"
      document.getElementById("timer").innerHTML =  minutes + "m " + seconds + "s ";
    
      // If the count down is finished, write some text
      if (distance < 0) {
        console.log('Clearing distn');
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
        this.isOtpDisabled = false;
      }
    }, 1000);
  }

  tick(counterRef) {
    console.log('In tick');
    var counter = document.getElementById("timer");
    if(this.seconds>0){
    this.seconds--;
    this.isOtpDisabled = true;
    counter.innerHTML = "0:" + (this.seconds < 10 ? "0" : "") + String(this.seconds);
    }  else {
    
      clearInterval(counterRef);
      this.isOtpDisabled = false;
      this.seconds = 60;
      console.log('In else', this.isOtpDisabled);
      document.getElementById("timer").innerText = `Resend`;
    }
    
  }



   countdown() {
    let counter =  setInterval(() => {
        this.tick(counter);
      }, 1000);
  }


}
