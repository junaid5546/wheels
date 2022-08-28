import { Injectable } from '@angular/core';
import { PostService } from 'dm-api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarFiltersService {
  //these all the sort types: 1- price_low 2- price_hight 3- date_new 4- date_old 5- kilometer_low 6- kilometer_hight 7- year_new 8- year_old
  sortType:string = "price_low";
  status:string = "627925bfda535aadb15ef3d4";
  pageNumber:number = 1;
  pageSize:number = 20;


  resultCount:number = 0;

  paginationOfMakeModelTrim:number = 15;
  currentProcess:string = null;
  filterObject:any = {};

  Filters:any;

  interiorColor:any = null;
  exteriorColor:any = null;
  makeModelTrim:any[] = [];
  bodies:any = null;
  plateType:any = null;
  warrentyDuration:any = null;
  modelYear:any = null;
  driveTrain:any = null;
  drivingReadiness:any=null;
  cylinders:any=null;
  saleType:any = null;
  condition:any=null;
  transmission:any=null;
  seats:any=null;
  insurance:any=null;
  origin:any=null;
  fuel:any=null;
  engineSize:any=null;
  doors:any = null;

  filterSource = new BehaviorSubject<any[]>([]);
  data$ = this.filterSource.asObservable();
  private plansSource=new BehaviorSubject<any[]>([]);
  plansData=this.plansSource.asObservable();
//GOVERNERATE
  locationSource = new BehaviorSubject<any[]>([]);
  locations$ = this.locationSource.asObservable();
  

  makeInitialPage = 0;
  makePageSize = 10;


  maxPages = this.makeModelTrim.length;

  constructor(private post:PostService) {
  
  }


  getFiltersList(Filters:any){
    this.filterSource.next(Filters);
  }
  getLocations(Locations:any){
    let x=Locations.map(element=>{
      let obj = {...element,checked:false,show:true};
      return obj;
    })
    this.locationSource.next(x);
  }

  setMakeModelTrims(makeModelTrim){
    this.makeModelTrim = makeModelTrim;
  }

  setBodies(bodies:any){
    this.bodies =  bodies.map(element => {
      let obj = {...element,checked:false};
      return obj;
    });;
  }

  getBodies(){
    return this.bodies;
  }

  getMakeModelTrims(){
    
   return  this.makeModelTrim;

  }

  setInteriorColor(interiorColor:any) {
    console.log("Interior color set",interiorColor);
    this.interiorColor = interiorColor.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }
  

  setExteriorColor(exteriorColor:any){
    console.log("Exterior color set",exteriorColor);
    this.exteriorColor = exteriorColor.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  setPlateType(plateType:any) {
    console.log("PLATE:", plateType);
    this.plateType = plateType.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getPlateType(){
  
    return this.plateType;
  }

  getInteriorColor(){
    return this.interiorColor;
  };

  getExteriorColor(){

    return this.exteriorColor;
  };
  

  setWarrentyDuration(warrantyDuration:any) {
    this.warrentyDuration = warrantyDuration.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });;
  }

  getWarrentyDuration(){
    return this.warrentyDuration;
  };

  setModelYear(modelYear:any){
    this.modelYear = modelYear.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getModelYear(){
    return this.modelYear;
  }

  setFuel(fuel:any) {
    this.fuel = fuel.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getFuel() {
    return this.fuel;
  }

  setOrigin(origin:any) {
    this.origin = origin.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getOrigin(){
    return this.origin;
  }

  setInsurance(insurance:any) {
    this.insurance = insurance.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getInsurance(){
    return this.insurance;
  }

  setSeats(seats:any) {
    this.seats = seats.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getSeats(){
    return this.seats;
  }

  setTransmission(transmission:any){
    this.transmission = transmission.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getTransmission(){
    return this.transmission;
  }

  setCondition(condition:any){
  this.condition =   condition.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getCondition(){
    return this.condition;
  }

  setSaleType(saleType:any){
    this.saleType =  saleType.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getSaleType(){
    return this.saleType;
  }

  setCylinderType(cylinderType:any){
    this.cylinders = cylinderType.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getCylinderType(){
    return this.cylinders;
  }

  setDriveTrain(drivetrain:any){
    this.driveTrain = drivetrain.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getDrivTrain(){
    return this.driveTrain;
  }

  setDrivingReadiness(readiness:any){
    this.drivingReadiness = readiness.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getDrivingReadiness(){
    return this.drivingReadiness;
  }

  setEngineSize(engineSize:any){
    this.engineSize = engineSize.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });

  }

  getEngineSize(){
    return this.engineSize;
  }

  // MOVE PLANS TO PLANS COMPONENT

  getPlans(plans:[]){
    this.plansSource.next(plans);
  }

  setDoors(door:any) {
    this.doors = door.types.map(x=>{
      let obj = {...x,checked:false};
      return obj;
    });
  }

  getDoors() {
    return this.doors;
  }

  getPost(){
    for (const property in this.filterObject) {
      console.log(`${property}: ${this.filterObject[property]}`);
        if(this.filterObject[property].length === 0) {
            delete this.filterObject[property]
        }
    }
    console.log("FILTER OBJ ", this.filterObject);
    this.post.getAllPosts(this.sortType,this.status,this.pageNumber,this.pageSize,'app',this.filterObject)
    
    .then((response:any)=>{
      console.log("Count",response.result.count);
      this.resultCount = response.result.count;
    })
  }


}
