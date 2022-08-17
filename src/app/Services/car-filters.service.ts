import { Injectable } from '@angular/core';
import { filter, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarFiltersService {
  Filters:any;
  
  makeModelTrim:any;
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

  getMakeModelTrims(){
    return this.makeModelTrim
  }

// MOVE PLANS TO PLANS COMPONENT

getPlans(plans:[]){
   this.plansSource.next(plans);
}

}
