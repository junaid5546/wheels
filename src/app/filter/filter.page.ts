import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
export interface Make {
  name: string;
  model: Model[];
}

export interface Model {
  name: string;
  trim: Trim[];
}

export interface Trim {
  name: string;
  body: string[];
}
export interface Item {
  make: Make;
  completed: boolean;
  item?: Item[];
  //subtasks?: Task[];
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  counter =0;

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
  allComplete: boolean = false;
  allMakeComplete: boolean = false;
  allModelComplete:boolean = false
    
    items =  [

      {
        completed: false,
        make: {
          name: 'Toyota',
          model: [
            {
              completed:false,
              name: 'Corolla',
              trim: [{completed:false, name: 'GLI', body: ['j2l2s2garbdfd2', '21kwerdsn23'] }],
            },
            {
              completed:false,
              name: 'Camry',
              trim: [{completed:false, name: 'XLI', body: ['j2l2setyruy2d2', '21knabrwer23'] }],
            },
            {
              completed:false,
              name: 'Avalon',
              trim: [{completed:false, name: 'BCB', body: ['j2lqtbqr2s2d2', '21kreyjtgfdn23'] }],
            },
          ],
        },
      },
/*
      {
        completed: false,
        make: {
          name: 'Honda',
          model: [
            {
              completed:false,
              name: 'Civic',
              trim: [{completed:false, name: 'GLI', body: ['j2ls2s2arerdd2', '21knwrtaasfbrasf23'] }],
            },
            {
              completed:false,
              name: 'City',
              trim: [{completed:false, name: 'GLI', body: ['j2xl324b2regtxs2d2', '21kn2sdfasxc3'] }],
            },
          ],
        },
      },

      {
        completed: false,
        make: {
          name: 'Nissan',
          model: [
            {
              completed:false,
              name: 'unknown',
              trim: [{completed:false, name: 'A', body: ['ja2ler235fewd42t22s2ad2', '21kujkuykb2e234hgtn23'] }],
            },
          ],
        },
      }*/
    ];

  filters = [
    { result: { count: 1 }, selected: false, id: 0, name: 'Body' },
    { result: { count: 0 }, selected: false, id: 1, name: 'Make/Model' },
    { result: { count: 0 }, selected: false, id: 2, name: 'Price' },
    { result: { count: 0 }, selected: false, id: 3, name: 'Condition' },
    { result: { count: 0 }, selected: false, id: 4, name: 'Year' },
    { result: { count: 0 }, selected: false, id: 5, name: 'Exterior Color' },
    { result: { count: 0 }, selected: false, id: 6, name: 'Interior Color' },
    { result: { count: 0 }, selected: false, id: 7, name: 'Doors' },
    { result: { count: 0 }, selected: false, id: 8, name: 'Cylinders' },
    { result: { count: 0 }, selected: false, id: 9, name: 'Engine Size' },
    { result: { count: 0 }, selected: false, id: 10, name: 'Fuel' },
    { result: { count: 0 }, selected: false, id: 11, name: 'Transmission' },
    { result: { count: 0 }, selected: false, id: 12, name: 'Drivetrain' },
    { result: { count: 0 }, selected: false, id: 13, name: 'Seats' },
    { result: { count: 0 }, selected: false, id: 14, name: 'Origin' },
    { result: { count: 0 }, selected: false, id: 15, name: 'Location' },
    { result: { count: 0 }, selected: false, id: 16, name: 'Plate' },
    {
      result: { count: 0 },
      selected: false,
      id: 17,
      name: 'Driving Readiness',
    },
    { result: { count: 0 }, selected: false, id: 18, name: 'Sale Type' },
  ];

  selectedIndex = -1;

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

  constructor() {}

  ngOnInit() {}

  selectedItem(index) {
    if (this.selectedIndex === -1) {
      console.log('If', index, this.selectedIndex);
      this.selectedIndex = index;
      this.filters[index].selected = true;
    } else {
      console.log('Else', index, this.selectedIndex);
      this.filters[this.selectedIndex].selected = false;
      this.filters[index].selected = true;
      this.selectedIndex = index;
    }
  }

  someMakeComplete(i): boolean {
    this.counter++;
    return this.items[i].make.model.filter(t => t.completed).length > 0 && !this.allMakeComplete;
  }

  ModelsomeComplete(i,modelIndex,model):boolean{
    this.counter++;
    console.log('called model some complete times.' ,this.counter  );
    let result = this.items[0].make.model[modelIndex].trim.filter(x=>x.completed).length;
    console.log('Length of total completed trims:', result);
    return false;
    //return this.items[0].make.model[modelIndex].trim.filter(x=>x.completed).length < 0 && !this.allModelComplete;
  }

  setModelAllTrims(completed: boolean,i,modeli, model) {
    console.log('Set- ALL - Trims of Model ', completed, model, 'Make Index:',i, "Model Index:", modeli);

     this.items[i].make.model[modeli].completed = completed;
     this.items[i].make.model[modeli].trim.forEach(x=>x.completed = completed); 
  }

  setAllMake(completed: boolean,i:number) {
    console.log('Set- ALL ', completed);
    this.allComplete = completed;
    if (this.items == null) {
      return;
    }
    this.items[i].completed = completed;
    this.items[i].make.model.forEach(x=>x.completed = completed);
    this.items[i].make.model.forEach(x=>x.trim.forEach(x=>x.completed = completed))
    this.items[i].make.model.forEach(x=> {
      console.log("Model: ", x.completed);
    })
    this.allModelComplete = completed;

    this.items[i].make.model.forEach(x=>x.trim.forEach(x=>{
      console.log("Trim",x.completed);
    }));

    console.log("Items : ",this.items[i].completed);
  }

  updateAllMakeComplete(makeIndex,modelIndex) {
    this.allMakeComplete = this.items[makeIndex].make.model.every(t => t.completed);
    console.log("Update all complete called--: ", this.allMakeComplete);
  }

  updateAllModelComplete(makeIndex,modelIndex,trimIndex){
    this.items[makeIndex].make.model[modelIndex].trim[trimIndex].completed = true;
    this.allModelComplete = this.items[makeIndex].make.model[modelIndex].trim.every(x=>x.completed);
    console.log("All Model Complete: ", this.allModelComplete);
  }


  //**     test   */

  updateAllComplete() {
    console.log("Update all complete called: ");
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed == true);
    console.log("Update all complete called: ", this.allComplete);
  }

  

  setAll(completed: boolean) {
    console.log("setAll called: ");
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  selectAllFromMake(complete:boolean) {
    console.log('Selecting all from Make');
    this.allMakeComplete = complete;
    this.items[0].make.model.forEach(t=>(t.completed = complete));
    this.items[0].make.model.forEach(t=>t.trim.forEach(x=>x.completed = complete));
  }

 //*****     test   ****/


}
