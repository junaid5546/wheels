import { Component, OnInit, Input } from '@angular/core';
import { PickerController } from '@ionic/angular';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  Dob;

  @Input() labelName:string = null;
  @Input() isOtpDisabled:boolean = false;
  @Input() minlength:string = null;
  @Input() maxlength:string = null;
  @Input() id:string = null;
  @Input() value:string = null;
  @Input() iconName:string = null;
  @Input() type:string = null;

  constructor(private picker:PickerController) { }


  ngOnInit() {
    console.log("TYPE: ", this.type);
  }


   // DATE TIME PICKER
   async presentPicker() {
    if(!this.isOtpDisabled) {
    const picker = await this.picker.create({
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
            this.getDateOfBirth(`${this.Dob.day}/${this.Dob.month}/${this.Dob.year}`);
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


  getDateOfBirth(date){
    console.log("DATE: ", date);
    let dateReal = date.split("/");
    let timeStamp = new Date(dateReal[2], dateReal[1]-1, dateReal[0]);
    console.log('TimeStamp', timeStamp.getTime());
    this.Dob = timeStamp.getTime();
}


}
