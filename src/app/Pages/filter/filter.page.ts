import { ChangeDetectionStrategy, Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import {  map } from 'rxjs/operators';

import { FiltersService } from 'dm-api';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilterPage implements OnInit,AfterViewInit {
  private filtersList = new BehaviorSubject<any[]>([]);


  
  public filters:any[] = [];
  selectedIndex = 0;

  heading = {
    has_main_heading: true,
    main_heading_name: 'Search Filters',
    has_sub_heading: false,
    sub_heading_name: null,
  };

  icons = {
    has_left_icon: true,
    has_right_icon: true,
    left_icon: 'assets/icon/settings/back.svg',
    right_icon: 'assets/icon/posts/post-details/Phone/Vector.svg',
  };

  constructor(private router:Router,
     private filterServices:FiltersService,
      private changeRef:ChangeDetectorRef,
      private filterPost:CarFiltersService ) {

    this.filtersList.subscribe((res)=>{
      this.applyFilters(res) })
  }
  
  ngAfterViewInit(): void {
     
  }

  ngOnInit() {
    this.getFiltersList();
  }
 
  
  selectedItem(index,url,data) {  
    // console.log(data);
    // console.log(index);    
    this.filters[this.selectedIndex].selected = false;
    this.filters[index].selected = true;
    this.selectedIndex = index;
    
    this.router.navigate([`filter/${url}`],{state: (data)});
    console.log("URL: ", url);
  }

  addFilter(name:string, value:string){
    let obj = {};
    obj[name] = value;
    this.filtersList.next((this.filtersList.getValue().concat([obj])));
  }

  /**
   * THIS METHOD GIVES BACK ALL FILTER LIST.
   */
  getFiltersList() {

      this.filterPost.data$.subscribe((data)=>{
        console.log(data);
        this.filters=data;
        data.map((element, index) => {
            let obj = { ...element , selected:false, show:false } 
          
            return obj;
          });
      })

  
  //this.filter.getFiltersList();
    // this.filterServices.getVehicleFilters()
    // .then((filters:any)=>{
    //   if(filters.code === 200) {
        
        // MODIFYING FILTERS ARRAY
        // this.filters = this.filter.map((element, index) => {
        //   let obj = { ...element , selected:false } 
        //   return obj;
        // });

       
        this.changeRef.markForCheck()
      //  console.log("CAR FILTER BODY: ", this.filters[1].types);
       // this.router.navigate(['filter/car-body',{data: JSON.stringify(this.filters[1].types)}])
      // this.router.navigate(['filter/car-body'],{state:this.filters[1].types})
       
    //   }
    // })
  }

  /**
   * 
   * @param filterList Array
   */
   applyFilters(filterList:any[]){
 
    }

}