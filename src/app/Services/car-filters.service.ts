import { Injectable } from '@angular/core';
import { PostService } from 'dm-api';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
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
  modelYear:any = [{name:{en:2002,ar:2002}}];
  driveTrain:any = null;
  drivingReadiness:any=null;
  cylinders:any=null;
  saleType:any = null;
  condition:any=[{name:{en:'New',ar:"New"}}];
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


  setFiltersList(Filters:any){
    this.filterSource.next(Filters);
  }

  setLocations(Locations:any){
    let x=Locations.map(element=>{
      let obj = {...element,checked:false,show:true};
      return obj;
    });
    this.locationSource.next(x);
  }

  setMakeModelTrims(makeModelTrim){

    let NewMakeModelArray =  makeModelTrim.map(make=>{
      let newModels = make.models.map(model=>{
       let newTrims = model.trims.map(trim=>{
         let trimObj = {...trim,completed:false,show:true};
         return trimObj;
       });
         let newModel = {name:model.name,completed:false,_id:model._id,trims:newTrims,show:true};
         return newModel;
       });
       let newMakeModelObject = {name:make.name, id:make._id, models:newModels, completed:false, show:true, clicked:false};
       return newMakeModelObject;
     });
     console.log("new make: ", NewMakeModelArray);
    this.makeModelTrim = NewMakeModelArray;
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
    console.log("MK MODEL: ", this.makeModelTrim);
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
  setPlans(plans:[]){
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
    
    console.log("FILTER OBJ ", this.filterObject);
    this.post.getAllPosts(this.sortType,this.status,this.pageNumber,this.pageSize,'app',this.filterObject)
    
    .then((response:any)=>{
      console.log("Count",response.result.count);
      this.resultCount = response.result.count;
    })
  }

// REMOVE ALL SELECTED FILTERS.

clearFilter(){
    this.data$.subscribe((filters:any)=>{
        let pointedObjects = filters.filter(obj => obj.hasOwnProperty('badge'));
        let addedObjects = pointedObjects.filter(obj=> obj.badge > 0 );
        console.log("Added Objects: ", addedObjects);
        this.filterSource.pipe(
          map((val) => {
          val.forEach(x=>x.badge = 0)
          return val;
         })
        ).subscribe((res)=>{
          console.log('Change:', res);
        })
        for (let index = 0; index < addedObjects.length; index++) {
          switch (addedObjects[index].path) {
            case 'Kbody':
            console.log("BODIES: ", this.bodies);
            this.bodies.forEach(element => {
              element.checked = false;
            });
              break;
              case 'Condition':
                this.condition.forEach(element => {
                  element.checked = false;
                });
                break;
                case 'interior_color':
                  this.interiorColor.forEach(element => {
                    element.checked = false;
                  });
                  break;
                  case 'Kdoor':
                    this.doors.forEach(element => {
                      element.checked = false;
                    });
                    break;
                    case 'Kyear':
                      this.modelYear.forEach(element => {
                        element.checked = false;
                      });
                    break;
                    case 'exterior_color':
                      this.exteriorColor.forEach(element => {
                        element.checked = false;
                      });
                    break;
                    case 'interior_color':
                      this.interiorColor.forEach(element => {
                        element.checked = false;
                      });
                    break;
                    case 'cylinder_count':
                      this.cylinders.forEach(element => {
                        element.checked = false;
                      });
                    break;

                    case 'engine_size':
                      this.engineSize.forEach(element => {
                        element.checked = false;
                      });
                    break;

                    case 'fuel':
                      this.fuel.forEach(element => {
                        element.checked = false;
                      });
                    break;

                    case 'transmission':
                      this.transmission.forEach(element => {
                        element.checked = false;
                      });
                    break;

                    case 'car-drivetrain-type':
                      this.driveTrain.forEach(element => {
                        element.checked = false;
                      });
                    break;

                    case 'seats':
                      this.seats.forEach(element => {
                        element.checked = false;
                      });
                    break;


                    case 'origin':
                      this.origin.forEach(element => {
                        element.checked = false;
                      });
                    break;


                    case 'car-insurance':
                      this.insurance.forEach(element => {
                        element.checked = false;
                      });
                    break;


                    case 'plate_type':
                      this.plateType.forEach(element => {
                        element.checked = false;
                      });
                    break;


                    case 'driving_readiness':
                      this.drivingReadiness.forEach(element => {
                        element.checked = false;
                      });
                    break;

                    case 'sale_type':
                      this.saleType.forEach(element => {
                        element.checked = false;
                      });
                    break;

                    case 'car-location':
                      
                    break;

          }
          
        }

       
    })
}

}
