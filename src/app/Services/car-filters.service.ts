import { Injectable } from '@angular/core';
import { filter, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarFiltersService {

  paginationOfMakeModelTrim:number = 10;

  Filters:any;
  interiorColor:any = null;
  exteriorColor:any = null;
  makeModelTrim:any = null;
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
  
  constructor() {
  
  }


  getFiltersList(Filters:any){
    this.filterSource.next(Filters);
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
    this.makeModelTrim.slice(0,this.paginationOfMakeModelTrim);
    return this.makeModelTrim
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
    this.plateType = plateType;
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


}
