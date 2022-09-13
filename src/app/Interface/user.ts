/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */
export class UserRegistration {
    
  first_name!:string;
  last_name!:string;
  primary_phone = {areaCode:0,phoneNumber:0};
  dob!:number

  constructor() {
      this.first_name = '';
      this.last_name = '';
      this.dob = 0;
  }

  getDateOfBirth(date){
      console.log("DATE: ", date);
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