import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'dm-api';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
import { ModalControllerService } from 'src/app/Services/modal-controller.service';

export interface Item {
  make: string;
  completed: boolean;
  item?: Item[];
  //subtasks?: Task[];
}
@Component({
  selector: 'app-vehicles-department',
  templateUrl: './vehicles-department.page.html',
  styleUrls: ['./vehicles-department.page.scss'],
})
export class VehiclesDepartmentPage implements OnInit {
  @Input() forwardTo:string = null;

  // ROUTE IS FORWARD OR BACK.
  @Input() goBack:string = null;
 
  // LEFT AND RIGHT ICON.
  icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/Language.svg'};

  // MAIN HEADING/SUBHEADING.
  @Input() heading = {has_main_heading:true, main_heading_name:'Vehicles Department', has_sub_heading:false, sub_heading_name:''};
  items:any[] = [

    {name:'Vehicles',img:'assets/icon/main-items-icon/vehicles.svg',hasClock:false, clock:'assets/icon/main-items-icon/clock.svg',navigate:'tabs/posts' },
    
    {name:'Estates',img:'assets/icon/main-items-icon/estates.svg',hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'estate'},
    
    {name:'Electronics',img:'assets/icon/main-items-icon/electronics.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'electronic'},
    
  ]
 
  constructor(  private modalService:ModalControllerService,
  
    private post:PostService,private filter:CarFiltersService) { }

  ngOnInit() {

    this.fetchPostFeed();
   
  }

  fetchPostFeed() {
    this.post.getPostFeed()
    .then((feed:any)=>{
      console.log("Post Feed:", feed);
      this.modalService.modelData.items[0].value = feed.result.makes;
      this.modalService.modelData.items[21].value=feed.result.governorates;
      this.modalService.modelData.items[23].value = feed.result.features;
      // body, make, price,
      // condition, year, extirior color
      // Interior color, doors, cylinder 
      // Engine Size, Fuel, Transmission
      // Drivetrain, Seats, Origin
      // Location, Plate, Driving Readiness
      // Sale Type
      //
    let NewMakeModelArray =   feed.result.makes.map(make=>{
       let newModels = make.models.map(model=>{
        let newTrims = model.trims.map(trim=>{
          let trimObj = {...trim,completed:false};
          return trimObj;
        });
          let newModel = {name:model.name,completed:false,_id:model._id,trims:newTrims};
          return newModel;
        });
        let newMakeModelObject = {name:make.name, id:make._id, models:newModels, completed:false, show:true};
        return newMakeModelObject;
      });
    
      console.log("NEW :",NewMakeModelArray);
      let filters = feed.result.filters;
      filters.push(
        {name:"Make", path:'car-make',types:feed.result.makes },
        {name:"Body", path:'car-body',},
        {name:"Price",path:'car-price'}
      );
      console.log("Filters:", filters);
      this.filter.getFiltersList(filters);
      this.filter.setMakeModelTrims(NewMakeModelArray);
      feed.result.filters.forEach(filterElement => { 
        
      this.modalService.modelData.items.forEach(modelDataElement => {
        if(filterElement.name==modelDataElement.name){
          modelDataElement.value=filterElement.types;
        }

      });
     });
    })
    .catch(error=>{
      console.log("Could not get post feed", error);
    })
  }



 
}
