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
  selector: 'app-make-model',
  templateUrl: './make-model.component.html',
  styleUrls: ['./make-model.component.scss'],
})

export class MakeModelComponent implements OnInit {
  counter =0;
  makeCheckboxColor = "primary";
  modelCheckboxColor = "primary";
  trimCheckboxColor = "warn";
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
      },
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
    ];
  constructor() { }

  ngOnInit() {}

// THIS FUNCTION CALLS WHEN CHANGE OCCUR IN CHECKBOXES AND EITHER CHECKBOX SHOULD BE INTERMEDIATE OR SELECTED.
someComplete(makeIndex): boolean {
  let result = this.items[makeIndex].make.model.filter(t=>t.completed).length > 0 && !this.items[makeIndex].completed;
  console.log("Result",result);
  return this.items[makeIndex].make.model.filter(t => t.completed).length > 0 && !this.items[makeIndex].completed;
}


// THIS FUNCTION CHECKES ALL THE MODELS AND TRIMS OF MAKE.
setAll(completed: boolean,makeIndex:number) {
  this.items[makeIndex].completed = true;
  this.items[makeIndex].make.model.forEach(t => {t.completed = completed 
    t.trim.forEach(x=>x.completed = completed)});
  console.log("Checked All", this.items[makeIndex].make.model);
}

ModelsomeComplete(i,modelIndex,model):boolean{
  //let result = this.items[0].make.model[modelIndex].trim.filter(x=>x.completed).length;
  //console.log('Length of total completed trims:', result);
  //return false;
  return this.items[i].make.model[modelIndex].trim.filter(x=>x.completed).length > 0 && !this.items[i].make.model[modelIndex].completed;
}


updateAllComplete(makeIndex:number) {
  this.items[makeIndex].completed =  this.items[makeIndex].make.model.every(t => t.completed);
  console.log("Every: ", this.allComplete);
} 

setModelAllTrims(completed: boolean,i,modeli, model) {
  console.log('Set- ALL - Trims of Model ', completed, model, 'Make Index:',i, "Model Index:", modeli);
   this.items[i].make.model[modeli].completed = completed;
   this.items[i].make.model[modeli].trim.forEach(x=>x.completed = completed); 
}


updateMake(makeIndex,modelIndex,trimIndex){
  this.items[makeIndex].completed = this.items[makeIndex].make.model.every(x=>x.completed) && this.items[makeIndex].make.model[modelIndex].trim.every(x=>x.completed);
}

updateAllModelComplete(makeIndex,modelIndex,trim) {
   
  this.items[makeIndex].make.model[modelIndex].completed = this.items[makeIndex].make.model[modelIndex].trim.every(x=>x.completed);
  console.log("All Model Complete: ", this.allModelComplete);
}


}
