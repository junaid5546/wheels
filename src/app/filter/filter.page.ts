import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  allComplete: boolean = false;

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Abx', completed: false, color: 'primary'},
      {name: 'cba', completed: false, color: 'accent'},
      {name: 'mma', completed: false, color: 'warn'},
    ],
  };

 filters = [
   {result:{count:1},selected:false,id:0,name:'Body'},
   {result:{count:0},selected:false,id:1,name:"Make/Model"},
   {result:{count:0},selected:false,id:2,name:"Price"},
   {result:{count:0},selected:false,id:3,name:"Condition"},
   {result:{count:0},selected:false,id:4,name:"Year"},
   {result:{count:0},selected:false,id:5,name:"Exterior Color"},
   {result:{count:0},selected:false,id:6,name:'Interior Color'},
   {result:{count:0},selected:false,id:7,name:"Doors"},
   {result:{count:0},selected:false,id:8,name:"Cylinders"},
   {result:{count:0},selected:false,id:9,name:"Engine Size"},
   {result:{count:0},selected:false,id:10,name:'Fuel'},
   {result:{count:0},selected:false,id:11,name:"Transmission"},
   {result:{count:0},selected:false,id:12,name:'Drivetrain'},
   {result:{count:0},selected:false,id:13,name:'Seats'},
   {result:{count:0},selected:false,id:14,name:"Origin"},
   {result:{count:0},selected:false,id:15,name:'Location'},
   {result:{count:0},selected:false,id:16,name:"Plate"},
   {result:{count:0},selected:false,id:17,name:"Driving Readiness"},
   {result:{count:0},selected:false,id:18,name:"Sale Type"}
 ];

 selectedIndex = -1;

  heading =  {
    has_main_heading: true,
    main_heading_name: "Search Filters",
    has_sub_heading: false,
    sub_heading_name: null
}

icons = {
  has_left_icon: true,
  has_right_icon: true,
  left_icon: 'assets/icon/settings/back.svg',
  right_icon: 'assets/icon/posts/post-details/Phone/Vector.svg'
}


  constructor() { }

  ngOnInit() {
  }

  selectedItem(index){
    if(this.selectedIndex === -1){
      console.log('If',index,this.selectedIndex);
      this.selectedIndex = index
      this.filters[index].selected = true;
    } else {
      console.log('Else',index,this.selectedIndex);
      this.filters[this.selectedIndex].selected = false;
      this.filters[index].selected = true;
      this.selectedIndex = index;
    }
  }

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    console.log("Set- ALL ", completed);
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

}
