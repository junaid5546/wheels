import { Component, OnInit, ViewChild, AfterViewInit,OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { UserRegistration } from '../../Interface/user';
import { AuthService } from 'dm-api';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { Router } from '@angular/router';
// RxJS v6+
import { timer } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit,OnDestroy, AfterViewInit {
  // THREE STEPS LOGIN/REGISTER
  // 0 MEANS PHONE
  // 1 MEANS DATE OF BIRTH IT MEANS THAT USER WILL LOGIN
  // 2 MEANS FIRST NAME AND LAST NAME 
  // 3 OTP ENTER 
  
  subscribeTimer = null;
  user:UserRegistration = new UserRegistration();
  timer = timer(1000,2000);
  step = 0;
  heading =  {has_main_heading:true, main_heading_name:'Register/Login', has_sub_heading:false, sub_heading_name:''};
  @ViewChild(IonInput, {static:false}) input: IonInput;
  phoneNumber:number[] = [];
  otp:number[] = [];
  seconds = 60;
  isOtpDisabled:boolean = false;
  buttonText:string = "Send OTP";

  countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
  Dob  = {day:null, month:null, year:null};


  constructor(private pickerController: PickerController,
              private router:Router,
              private auth:AuthService,
              private popUp:ModalControllerService) {

   }





  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log("Destroyed: ");
    this.subscribeTimer.unsubscribe();
  }

  ngAfterViewInit() {
    console.log("Input ele",this.input);
    this.input.setFocus();
    //this.input.autofocus = true;

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
        this.user.primary_phone.phoneNumber = Number(phone);
        console.log('User : ',  this.user);
        this.checkIsexist();
      }
    } else if(key.keyCode == 8) {
      prev.setFocus();  
      this.phoneNumber.pop();
    } else {
      current.value = '';
    }
   
  }

  gotoNextFieldOTP(current,nextElement,prev, key,index) {
    if(key.keyCode != 8 && key.keyCode >=48 && key.keyCode <=57) {
      this.otp[index] = key.key;
      console.log(current.value, typeof(current.value));
      console.log("Key", key, "Phone: ", this.otp.length);
      nextElement.setFocus();
      if(this.otp.length == 6){
          let otp = '';
        this.otp.forEach(x=>{
          console.log(x);
          otp += x.toString();
        });
       // AUTH CONFIRM PIN.
      this.auth.confirmPin(otp)
      .then((result)=>{
        console.log("Pin Confirmation Result: ", result);
        if(this.auth.getIsExist()){
          this.login();
        } else {
          this.auth.registerNewUser(this.user);
        }
      })
      .catch(error=>{
        console.log("Wrong pin",error);
        this.popUp.presentToast('OTP','Entered Wrong PIN')
      })
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
    this.user.primary_phone.areaCode = Number(code.detail.value.split('+')[1]);
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
            this.Dob.day = selected.day.value;
            this.Dob.month = selected.month.value
            this.Dob.year = selected.Year.value
            this.user.getDateOfBirth(`${this.Dob.day}/${this.Dob.month}/${this.Dob.year}`);
            //this.selectedAnimal = selected.day.value;
          },
        }
      ],
      columns: [
        {
          name: 'day',
          options: [
            { text: '1', value: '01' },
            { text: '2', value: '02' },
            { text: '3', value: '03' },
            { text: '4', value: '04' },
            { text: '5', value: '05' },
            { text: '6', value: '06' },
            { text: '7', value: '07' }
          ]
        },
        {
          name:'month',
          options:[{text:'Jan', value:'01'},{text:'Feb',value:"02"},{text:"Mar",value:'03'},{text:'April',value:'04'},
                  {text:'May', value:'05'}, {text:'June', value:'06'}, {text:'July', value:'07'}, {text:'August', value:'08'},
                {text:'September', value:'09'}, {text:'October', value:'10'},{text:'November', value:'11'}, {text:'December', value:'12'}]

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

  tick() {
    this.subscribeTimer = this.timer.subscribe(val => {
      console.log('In tick',val);
      var counter = document.getElementById("timer");
      if(this.seconds>0){
      this.seconds--;
      this.isOtpDisabled = true;
      counter.innerHTML = "0:" + (this.seconds < 10 ? "0" : "") + String(this.seconds);
}  else {

  this.isOtpDisabled = false;
  this.seconds = 60;
  console.log('In else', this.isOtpDisabled);
  document.getElementById("timer").innerText = `Resend`;
}
    }); 
    
  }



   countdown() {
    this.auth.signInwithPhoneNumber(`+${this.user.primary_phone.areaCode}${this.user.primary_phone.phoneNumber}`)
    .then((res)=>{
      if(res){
       //emit 0 after 1 second then complete, since no second argument is supplied
       this.step = 3;
         this.tick();
      }
    })
  }


  async checkIsexist(){
    
   this.auth.isUserExist(this.user.primary_phone.areaCode, this.user.primary_phone.phoneNumber)
    .then((res)=>{
      if(res['code'] === 3) {
        // USER DOES NOT EXIST CREATE NEW USER 
        this.step = 2;
        this.auth.setIsExist(false);
        console.log("DOES NOT EXIST");
      } else {
        this.auth.setIsExist(true);
        console.log("EXIST");
       this.step = 1;
      }
    })
    .catch((error)=>{
      console.log("APi error checking existing user: ", error);
    })
  }
  
  login(){
    let obj = {phone:this.user.primary_phone,dob:this.user.dob};
    this.auth.login(obj)
    .then((result)=>{
      console.log("Login Result: ", result);
      this.subscribeTimer.unsubscribe();
      this.router.navigate([''])
    })
    .catch((error)=>{
      console.log("Login Error: ", error);
    })
  }

 async ionViewDidEnter() {
   this.auth.recaptcha();
 }

  ionViewDidLoad() {
    this.auth.recaptcha();
  }

  
}
