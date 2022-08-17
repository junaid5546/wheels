import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CarFiltersService  } from '../../../Services/car-filters.service';
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
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class MakeModelComponent implements OnInit {

  //When searching, the page should show the things that are being searched for
  //We shouldn’t select for the user. Because, we don’t know if he wants Ford Mustang GT or Ford GT or Mercedes GT.
  //So it’s better to show and expand all of the makes models trims based on that key search
  
  searchedText = '';
  currentItratot = 0;
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
    
    items;
  constructor( private carFilters:CarFiltersService) { }

  ngOnInit() {
    console.log("Got MAKE MODEL TRIM: ", this.carFilters.getMakeModelTrims());
    this.items = this.carFilters.getMakeModelTrims();
    console.log("ITEMS: ", this.items);
  }

// THIS FUNCTION CALLS WHEN CHANGE OCCUR IN CHECKBOXES AND EITHER CHECKBOX SHOULD BE INTERMEDIATE OR SELECTED.
someComplete(makeIndex): boolean {
  console.log("Result",makeIndex);
  let result = this.items[makeIndex].models.filter(t=>t.completed).length > 0 && !this.items[makeIndex].completed;
  console.log("Result",result);
  return this.items[makeIndex].models.filter(t => t.completed).length > 0 && !this.items[makeIndex].completed;
}


// THIS FUNCTION CHECKES ALL THE MODELS AND TRIMS OF MAKE.
setAll(completed: boolean,makeIndex:number) {
  this.items[makeIndex].completed = true;
  this.items[makeIndex].models.forEach(t => {t.completed = completed 
    t.trims.forEach(x=>x.completed = completed)});
  console.log("Checked All", this.items[makeIndex].models);
}

ModelsomeComplete(i,modelIndex,model):boolean{
  //let result = this.items[0].make.model[modelIndex].trim.filter(x=>x.completed).length;
  //console.log('Length of total completed trims:', result);
  //return false;
  return this.items[i].models[modelIndex].trims.filter(x=>x.completed).length > 0 && !this.items[i].models[modelIndex].completed;
}


updateAllComplete(makeIndex:number) {
  this.items[makeIndex].completed =  this.items[makeIndex].models.every(t => t.completed);
  console.log("Every: ", this.allComplete);
} 

setModelAllTrims(completed: boolean,i,modeli, model) {
  console.log('Set- ALL - Trims of Model ', completed, model, 'Make Index:',i, "Model Index:", modeli);
   this.items[i].models[modeli].completed = completed;
   this.items[i].models[modeli].trims.forEach(x=>x.completed = completed); 
}


updateMake(makeIndex,modelIndex,trimIndex){
  this.items[makeIndex].completed = this.items[makeIndex].models.every(x=>x.completed) && this.items[makeIndex].models[modelIndex].trims.every(x=>x.completed);
}

updateAllModelComplete(makeIndex,modelIndex,trim) {
   
  this.items[makeIndex].models[modelIndex].completed = this.items[makeIndex].models[modelIndex].trims.every(x=>x.completed);
  console.log("All Model Complete: ", this.allModelComplete);
}


searchByName(name) { //qx

  this.searchedText = name.detail.value;
  console.log(this.searchedText);

  let foundIndex = -1;
 
    //LC 500
   this.items.filter((make,index)=>{
    if (make.name.toLocaleLowerCase() == this.searchedText.toLocaleLowerCase()) {
      foundIndex = index;
      this.items[index].completed = true;
    } else {
      make.models.filter((model,modelIndex) => {
        if (model.name.toLocaleLowerCase() === this.searchedText.toLocaleLowerCase()) {
          console.log("IN MODEL IF");
          this.items[index].models[modelIndex].completed = true;
          foundIndex = index;
        } else{
          model.trims.filter((trim,trimIndex)=>{
            if (trim.name.toLocaleLowerCase() == this.searchedText.toLocaleLowerCase()) {
              console.log("IN trim IF",trim);
              this.items[index].models[modelIndex].trims[trimIndex].completed = true;
              foundIndex =  index;
            } 
          })
        }
      })
    }
  });
  console.log("RESULT: ", this.items[foundIndex]);
}


}