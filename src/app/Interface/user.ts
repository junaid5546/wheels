export class UserRegistration {
    
  firstName!:string;
  lastName!:string;
  primaryPhone = {areacode:0,phoneNumber:0};
  dob!:number

  constructor() {
      this.firstName = '';
      this.lastName = '';
      this.dob = 0;
  }

  getDateOfBirth(date){
      
      let dateReal = date.split("/");
      let timeStamp = new Date(dateReal[2], dateReal[1]-1, dateReal[0]);
      console.log('TimeStamp', timeStamp.getTime());
      this.dob = timeStamp.getTime();
  }
}
      
      
  
export class AuthToken {
  phone!:number;
  dob!:number
}