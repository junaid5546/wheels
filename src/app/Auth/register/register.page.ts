import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { PickerController } from '@ionic/angular';

export interface Register{
  code:string;
  number:number,
  firstName:string,
  lastName:string,
  dateOfBirth:string,
  otpCode:string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit {

  @ViewChild(IonInput, {static:false}) input: IonInput;
  phoneNumber:number[] = [];
  registrationObj:Register;
  seconds = 60;
  isOtpDisabled:boolean = false;
  buttonText:string = "Send OTP";
  countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
  Dob  = {day:null, month:null, year:null};


  constructor(private pickerController: PickerController) { }
  


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
    if(key.keyCode != 8 && key.keyCode >=48 && key.keyCode <=57) {
      this.phoneNumber.push(key.key)
      console.log(current.value, typeof(current.value));
      console.log("Key", key);
      nextElement.setFocus();
      if(this.phoneNumber.length == 8){
        console.log('Phone Number: ', this.phoneNumber);
        
      }
    } else if(key.keyCode == 8) {
      prev.setFocus();  
      this.phoneNumber.pop();
    } else {
      current.value = '';
    }
   
  }

  selectCountryCode(code,first){
    console.log('Input', this.input);
    first.setFocus();
  }

  validate(ev) {
    console.log('')
  }
 

  // DATE TIME PICKER
  async presentPicker() {
    if(!this.isOtpDisabled) {
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
            this.Dob.day = selected.day.text;
            this.Dob.month = selected.month.text
            this.Dob.year = selected.Year.text
            //this.selectedAnimal = selected.day.value;
          },
        }
      ],
      columns: [
        {
          name: 'day',
          options: [
            { text: '1', value: '1' },
            { text: '2', value: '2' },
            { text: '3', value: '3' },
            { text: '4', value: '4' },
            { text: '5', value: '5' },
            { text: '6', value: '6' },
            { text: '7', value: '7' }
          ]
        },
        {
          name:'month',
          options:[{text:'Jan', value:'1'},{text:'Feb',value:"2"},{text:"Mar",value:'3'},{text:'April',value:4},
                  {text:'May', value:5}, {text:'June', value:6}, {text:'July', value:7}, {text:'August', value:8},
                {text:'September', value:9}, {text:'October', value:10},{text:'November', value:11}, {text:'December', value:12}]

        },
        {
          name:'Year',
          options:[{text:'1970', value:'1970'},{text:'2002',value:"2002"},{text:"2003",value:'2003'}]
        },
      ],
      animated:true,
      
    });
    await picker.present();
  } else {
    return false;
  }
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
