import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { AuthService } from '../../auth.service'
import { UserRegistration } from '../../Interface/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, AfterViewInit {
  // THREE STEPS LOGIN/REGISTER
  // 0 MEANS PHONE
  // 1 MEANS DATE OF BIRTH IT MEANS THAT USER WILL LOGIN
  // 2 MEANS FIRST NAME AND LAST NAME 

  user:UserRegistration = new UserRegistration();

  step = 0;
  heading =  {has_main_heading:true, main_heading_name:'Register/Login', has_sub_heading:false, sub_heading_name:''};
  @ViewChild(IonInput, {static:false}) input: IonInput;
  phoneNumber:number[] = [];
  seconds = 60;
  isOtpDisabled:boolean = false;
  buttonText:string = "Send OTP";
  countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
  Dob  = {day:null, month:null, year:null};


  constructor(private pickerController: PickerController, private auth:AuthService) {

   }
  


  ngAfterViewInit() {
    console.log("Input ele",this.input);
    this.input.setFocus();
    //this.input.autofocus = true;

  }


  ngOnInit() {
    this.checkIsexist();
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

  gotoNextField(current,nextElement,prev, key,index) {
    if(key.keyCode != 8 && key.keyCode >=48 && key.keyCode <=57) {
      this.phoneNumber[index] = key.key;
      console.log(current.value, typeof(current.value));
      console.log("Key", key, "Phone: ", this.phoneNumber.length);
      nextElement.setFocus();
      if(this.phoneNumber.length == 8){
          let phone = '';
        this.phoneNumber.forEach(x=>{
          console.log(x);
            phone += x.toString();
        });
        console.log("Phone", phone);
        this.user.primaryPhone.phoneNumber = Number(phone);
        console.log('User : ',  this.user);
        this.countdown();
      }
    } else if(key.keyCode == 8) {
      prev.setFocus();  
      this.phoneNumber.pop();
    } else {
      current.value = '';
    }
   
  }

  selectCountryCode(code,first){
    console.log(code);
    this.user.primaryPhone.areacode = Number(code.detail.value.split('+')[1]);
    console.log("User:", this.user);
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
    this.auth.recaptcha();
  
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
    this.auth.signInwithPhoneNumber()
  }


  async checkIsexist(){
    
    this.auth.isUserExist(this.user.primaryPhone.areacode.toString(), this.user.primaryPhone.phoneNumber.toString())
    .then((res)=>{
      console.log("Check api response: ", res);
    })
    .catch((error)=>{
      console.log("APi error checking existing user: ", error);
    })
  }


 async ionViewDidEnter() {
   this.auth.recaptcha();
 }
  ionViewDidLoad() {
    this.auth.recaptcha();
  }
}
