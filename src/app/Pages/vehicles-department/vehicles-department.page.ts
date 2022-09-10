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
  styleUrls: ['./vehicles-department.page.scss']
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
    this.post.getPostFeed('')
    .then((feed:any)=>{
      console.log("Post Feed:", feed);
      this.modalService.modelData.items[0].value = feed.result.makes;
      this.modalService.modelData.items[21].value=feed.result.governorates;
      this.modalService.modelData.items[23].value = feed.result.features;
      let filters = feed.result.filters;
      
    let NewMakeModelArray =   feed.result.makes.map(make=>{
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
    
      
      this.filter.setInteriorColor(feed.result.filters[3]);
      this.filter.setExteriorColor(feed.result.filters[2]);
      this.filter.setPlateType(feed.result.filters[13]);
      this.filter.setWarrentyDuration(feed.result.filters[12]);
      this.filter.setModelYear(feed.result.filters[1]);
      this.filter.setFuel(feed.result.filters[7]);
      this.filter.setOrigin(feed.result.filters[11]);
      this.filter.setInsurance(feed.result.filters[12]);
      this.filter.setSeats(feed.result.filters[10]);
      this.filter.setTransmission(feed.result.filters[8]);
      this.filter.setCondition(feed.result.filters[0]);
      this.filter.setSaleType(feed.result.filters[15]);
      this.filter.setCylinderType(feed.result.filters[5]);
      this.filter.setDriveTrain(feed.result.filters[9]);
      this.filter.setDrivingReadiness(feed.result.filters[14]);
      this.filter.setPlateType(feed.result.filters[13]);
      this.filter.setEngineSize(feed.result.filters[6]);
      this.filter.setDoors(feed.result.filters[4]);
      filters.unshift({name: {en:"Body",ar:"الهيكل"}, path:'Kbody'},{name:{en:"Make",ar:"شركة التصنيع"}, path:'Kmake'},{name:{en:"Price",ar:"السعر"},path:'price'});
      filters.push({name:{en:"Location",ar:"الموقع"},path:"car-location"});
      // adding key value for bage/counter;
      filters = filters.map(x=>{
        let obj = {...x,bage:null};
        return obj
      });

      this.filter.setFiltersList(filters);
      this.filter.setLocations(feed.result.governorates);
      this.filter.setMakeModelTrims(NewMakeModelArray);
      this.filter.setBodies(feed.result.bodies);

      feed.result.filters.forEach((filterElement,apiIndex) => {   
        this.modalService.modelData.items.forEach((modelDataElement,index) => {
        if(filterElement.name.en == modelDataElement.name && index != 0 && index != 21 && index != 23){
          modelDataElement.value=filterElement.types
        if(index == 4 && apiIndex == 3){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  3  && apiIndex == 4){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  8   && apiIndex == 5){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  13   && apiIndex == 6){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  7  && apiIndex == 7){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  9   && apiIndex == 8){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  6  && apiIndex == 9){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  10  && apiIndex == 10){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  11  && apiIndex == 11){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  12  && apiIndex == 12){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  14  && apiIndex == 13){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  20  && apiIndex == 14){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  15  && apiIndex == 15){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  16  && apiIndex == 16){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  17  && apiIndex == 17){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  18  && apiIndex == 18){
          modelDataElement.filterId = filterElement._id;
        }
        if(index ==  19  && apiIndex == 19){
          modelDataElement.filterId = filterElement._id;
        }
        }
      });
     });

     console.info("Model Initialized: ",this.modalService.modelData);
     console.info("Models: ",feed.result.makes);
    })
    .catch(error=>{
      console.log("Could not get post feed", error);
    })
  }

}
