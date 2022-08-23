import { ChangeDetectionStrategy, Component, OnInit,ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { CarFiltersService  } from '../../../Services/car-filters.service';
import { IonAccordionGroup } from '@ionic/angular';
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

  @ViewChild('parent', { static: true }) makeAccordian: IonAccordionGroup;
  @ViewChild('child', { static: true }) modelAccordian: IonAccordionGroup;
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
  console.log("Some Complete");
  return this.items[makeIndex].models.filter(t => t.completed ).length > 0 && !this.items[makeIndex].completed;
}


// THIS FUNCTION CHECKES ALL THE MODELS AND TRIMS OF MAKE.
setAll(completed: boolean,makeIndex:number) {
  this.items[makeIndex].completed = true;
  this.items[makeIndex].models.forEach(t => {t.completed = completed 
    t.trims.forEach(x=>x.completed = completed)});
  console.log("Checked All", this.items[makeIndex].models);
}

ModelsomeComplete(i,modelIndex,model):boolean{
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
  this.items[makeIndex].completed = this.items[makeIndex].models.every(x=>  x.completed) && this.items[makeIndex].models[modelIndex].trims.every(x=>x.completed);
}

updateAllModelComplete(makeIndex,modelIndex,trim) {
   
  this.items[makeIndex].models[modelIndex].completed = this.items[makeIndex].models[modelIndex].trims.every(x=>x.completed);
}


searchByName(name) { //qx
  
  this.searchedText = name.detail.value;
  this.searchedText = this.searchedText.toLocaleLowerCase();
  console.log(this.searchedText);
  if(this.searchedText == '') {
    console.log("SEARCH CLEARED");
    this.items.forEach(element => {
      element.show = true
    });
  }
  let foundIndex = -1;
   this.items.filter((make,index)=>{
    this.items[index].show = false;
    if (make.name.toLocaleLowerCase().startsWith(this.searchedText)) {
      foundIndex = index;
      this.items[index].show = true;
      this.items[index].models.forEach(element => {
        element.show = true;
        element.trims.forEach(element => {
          element.show = true;
        });
      });
      
      
    } else {
      make.models.filter((model,modelIndex) => {

        this.items[index].models[modelIndex].show = false;

        if (model.name.toLocaleLowerCase().startsWith(this.searchedText)) {
          console.log("IN MODEL IF");
          foundIndex = index;
          this.items[index].models[modelIndex].show = true;
          this.items[index].show = true;
        } else{
          model.trims.filter((trim,trimIndex)=>{
            this.items[index].models[modelIndex].trims[trimIndex].show = false;
            if (trim.name.toLocaleLowerCase().startsWith(this.searchedText)) {
              
              console.log("IN trim IF",trim);
              foundIndex =  index;
              this.items[index].models[modelIndex].trims[trimIndex].show = true;
              this.items[index].models[modelIndex].show = true;
              this.items[index].show = true;
            } 
          })
        }
      })
    }
  });
  console.log("RESULT: ", this.items[foundIndex]);
}

 a(){
  let result = [].filter((make,index)=>{

    if(make.name === "a"){
        console.log("MAKE:", make,",", index)
    }
    
    else {

        make.model.filter((model,index)=>{
            console.log("MODEL",model, ",",index);
            
            if(model.name === "searched"){
                console.log("MODEL found:", model,',', index);    
            } else{
            
                model.trim.filter((trim,index)=>{
                console.log("TRIM:", model,',', index); 

                if(trim.name === "searched"){
                    console.log("TRIM found:", model,',', index); 
                }
            })
                
            }
        })
        
    }
    
  });
 }


}