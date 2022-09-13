import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import { map } from 'rxjs/operators';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],

})
export class LocationComponent implements OnInit {
  selectAll:boolean = false;
  label:string = null;
  locations:any[]=[];
  makeCheckboxColor='primary';
  searchedText = '';
  locationValue='';
  allComplete: boolean = false;
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };
  constructor(private carFilters:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }

  ngOnInit() {
   this.label = this.activated.snapshot.params.label;
   this.carFilters.filterObject[this.label] = [];
   this.carFilters.locations$.subscribe(loc=>{
    this.locations=loc;
      console.log("On init called Locations",this.locations);
    });
    
  }
  setAll(completed: boolean,stateIndex:number) {
    this.locations[stateIndex].completed = true;
    this.locations[stateIndex].states.forEach(t => {
      t.completed = completed 
      });
    console.log("Checked All", this.locations[stateIndex].states);
  }


  updateGovernrate(index,stateIndex){
    this.locations[stateIndex].completed = this.locations[stateIndex].states.every(x=>  x.completed);
    console.log(this.locations[index].states[stateIndex])
  }


  searchByName(name){ 
    this.searchedText = name.detail.value;
    console.log(this.searchedText);
    if(this.searchedText != '') {
      
    this.locations.filter((gover,goverIndex)=>{
      this.locations[goverIndex].show = false;
        if (gover.name.toLocaleLowerCase() == this.searchedText.toLocaleLowerCase()) {
          this.locations[goverIndex].show = true;
          console.log(this.locations[goverIndex]);
        }else{
         gover.states.filter((a,stateIndex)=>{
          if(a.name.toLocaleLowerCase()==this.searchedText.toLocaleLowerCase()){
            console.log(a);
            this.locations[goverIndex].show=true;
            this.locationValue=`first_${goverIndex}`;
          }
         })
        }
        
    });
  }else{
    this.locations.forEach(element => {
      element.show=true;
      this.locationValue=`first_`;
    });
  }
  }

  someComplete(makeIndex): boolean {
    return this.locations[makeIndex].states.filter(t => (t.completed)).length > 0 && !this.locations[makeIndex].completed;
  }

  selectAllItems(){
    
  }

  updateBadge(){
    let res = this.locations.filter(x=>x.checked);
    this.carFilters.filterSource.pipe(
      map((val: any) => {
      val[8].badge = res.length;
      return val[8]
     })
    ).subscribe((res)=>{
      console.log('Change:', res);
    })
  }
}
