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
  currentProcess:string = null;
  filterObject:any = {};

  Filters:any;

  filterSource = new BehaviorSubject<any[]>([]);
  data$ = this.filterSource.asObservable();
  private plansSource=new BehaviorSubject<any[]>([]);
  plansData=this.plansSource.asObservable();

  constructor(private post:PostService) {}

  // RETURNS ONLY FILTER WHICH IS REQUESTED FROM THE FILTER PAGE BY NAME.
  getRequestedFilter(filterName:string){
  return this.filterSource.value.filter( x=>x.path === filterName)[0];
  }

// INITIATE FILTER LIST.
  setFiltersList(Filters:any){
    this.filterSource.next(Filters);
  }

// POST FILTER API FOR GETTING FILTERED POST.
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
    })
}

}
