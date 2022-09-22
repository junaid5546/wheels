import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core'
import { CarFiltersService } from 'src/app/Services/car-filters.service'
import { UserDataService } from 'src/app/Services/user-data.service'
import { ThemePalette } from '@angular/material/core'
import { DebugerService } from 'src/app/Services/debuger.service'

export interface Task {
  name: string
  completed: boolean
  color: ThemePalette
  subtasks?: Task[]
}
export interface Make {
  name: string
  model: Model[]
}

export interface Model {
  name: string
  trim: Trim[]
}

export interface Trim {
  name: string
  body: string[]
}
export interface Item {
  make: Make
  completed: boolean
  item?: Item[]
  //subtasks?: Task[];
}

@Component({
  selector: 'app-filter-item-accordian',
  templateUrl: './filter-item-accordian.component.html',
  styleUrls: ['./filter-item-accordian.component.scss']
})
export class FilterItemAccordianComponent implements OnInit {
  label: string = null
  selectAll: boolean = false
  //When searching, the page should show the things that are being searched for
  //We shouldn’t select for the user. Because, we don’t know if he wants Ford Mustang GT or Ford GT or Mercedes GT.
  //So it’s better to show and expand all of the makes models trims based on that key search

  searchedText = ''
  selectedMakeName: string = ''
  selectedModelName: string = ''

  firstResultPointer: any = null
  secResultPointer: any = null

  currentItratot = 0
  counter = 0
  makeCheckboxColor = 'primary'
  modelCheckboxColor = 'primary'
  trimCheckboxColor = 'warn'
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' }
    ]
  }
  allComplete: boolean = false
  allMakeComplete: boolean = false
  allModelComplete: boolean = false

  items
  start = 1
  count = 15
  constructor (
    private carFilters: CarFiltersService,
    public userData: UserDataService,
    public debug : DebugerService
  ) {}

  ngOnInit () {
    //console.log("MAKE MODEL TRIM  :", this.carFilters.getMakeModelTrims());
    //this.items = this.carFilters.getMakeModelTrims();
    this.debug.log('app-filter-item-accordian Initialized : ',this.carFilters.getCurrentFilter(),'Green' , true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.debug.log('Changes in app-filter-item-accordian', changes,'Red',true)
  }

  ngOnDestroy(): void {
    this.debug.log('app-filter-item-accordian', 'Destroyed!','yellow',true)
  }

  // THIS FUNCTION CALLS WHEN CHANGE OCCUR IN CHECKBOXES AND EITHER CHECKBOX SHOULD BE INTERMEDIATE OR SELECTED.
  someComplete (makeIndex): boolean {
    console.log('Some Complete')
    return (
      this.items[makeIndex].models.filter(t => t.completed).length > 0 &&
      !this.items[makeIndex].completed
    )
  }

  // THIS FUNCTION CHECKES ALL THE MODELS AND TRIMS OF MAKE.
  setAll (completed: boolean, makeIndex: number) {
    this.items[makeIndex].completed = true
    this.items[makeIndex].models.forEach(t => {
      t.completed = completed
      t.trims.forEach(x => (x.completed = completed))
    })
    console.log('Checked All', this.items[makeIndex].models)
  }

  ModelsomeComplete (i, modelIndex, model): boolean {
    return (
      this.items[i].models[modelIndex].trims.filter(x => x.completed).length >
        0 && !this.items[i].models[modelIndex].completed
    )
  }

  updateAllComplete (makeIndex: number) {
    this.items[makeIndex].completed = this.items[makeIndex].models.every(
      t => t.completed
    )
    console.log('Every: ', this.allComplete)
  }

  setModelAllTrims (completed: boolean, i, modeli, model) {
    console.log(
      'Set- ALL - Trims of Model ',
      completed,
      model,
      'Make Index:',
      i,
      'Model Index:',
      modeli
    )
    this.items[i].models[modeli].completed = completed
    this.items[i].models[modeli].trims.forEach(x => (x.completed = completed))
  }

  updateMake (makeIndex, modelIndex, trimIndex) {
    this.items[makeIndex].completed =
      this.items[makeIndex].models.every(x => x.completed) &&
      this.items[makeIndex].models[modelIndex].trims.every(x => x.completed)
  }

  updateAllModelComplete (makeIndex, modelIndex, trim) {
    this.items[makeIndex].models[modelIndex].completed = this.items[
      makeIndex
    ].models[modelIndex].trims.every(x => x.completed)
  }

  searchByName (name) {
    //qx
    this.searchedText = name.detail.value
    this.searchedText = this.searchedText.toLocaleLowerCase()
    let howManyWords = this.searchedText.split(' ').length
    console.log(this.searchedText)
    if (this.searchedText == '') {
      console.log('SEARCH CLEARED')
      this.items.forEach(element => {
        element.show = true
      })
    }

    switch (howManyWords) {
      case 1: // one word | Make | Model | Trim
        console.log('Case: 1')

        this.searchSpecificWord()
        console.log('Case One Result : ', this.searchSpecificWord())
        break

      case 2: // two word | Make Model | Make Trim
        console.log('Case: 2')
        this.searchMultiple(this.searchedText)
        break

      default:
        console.log('Default case')
        break
    }
  }

  searchSpecificWord () {
    let result = []
    this.items.filter((make, index) => {
      this.items[index].show = false
      if (make.name.en.toLocaleLowerCase().startsWith(this.searchedText)) {
        result.push(make)
        this.items[index].show = true
        this.selectedMakeName = `${this.items[
          index
        ].name.en.toLocaleUpperCase()},${index}`
        this.items[index].models.forEach(element => {
          element.show = true
          element.trims.forEach(element => {
            element.show = true
          })
        })
      } else {
        make.models.filter((model, modelIndex) => {
          this.items[index].models[modelIndex].show = false
          if (model.name.en.toLocaleLowerCase().startsWith(this.searchedText)) {
            this.selectedMakeName = `${this.items[
              index
            ].name.en.toLocaleUpperCase()},${index}`
            this.items[index].models[modelIndex].show = true
            this.selectedModelName = this.items[index].models[
              modelIndex
            ].name.en
            this.items[index].show = true
          }
        })
      }
    })
    console.log('Result:')
    return result
  }

  searchMultiple (word) {
    let makeModel = word.split(' ')
    let searchMake = this.lookUpMake(makeModel[0])
    console.log('Make: ', searchMake)
    let searchModel = this.lookUpModels(searchMake, makeModel[1])
    console.log('Found Models', searchModel)
  }

  lookUpMake (makeName) {
    let makes: any[] = []
    this.items.filter((make, index) => {
      if (make.name.en.toLocaleLowerCase().startsWith(makeName)) {
        let obj = { ...make, Index: index }
        makes.push(obj)
      }
    })
    return makes
  }

  lookUpModels = (firstPointer, model_name) => {
    this.items.forEach(make => {
      make.models.forEach(model => {
        model.show = false
      })
      make.show = false
    })

    let tempArray = firstPointer
    let foundModels = []

    tempArray.forEach((item, index) => {
      item.models.filter((model, modelIndex) => {
        if (model.name.en.toLocaleLowerCase().startsWith(model_name)) {
          this.items[item.Index].show = true
          this.items[item.Index].models[modelIndex].show = true
          this.items[item.Index].clicked = true
          this.selectedMakeName = `${this.items[
            item.Index
          ].name.en.toLocaleUpperCase()},${item.Index}`
          console.log('Selected Name: ', this.selectedMakeName)
          foundModels.push(item)
        }
      })
    })
    return foundModels
  }

  searchMakeModelTrim () {}

  accordionGroupChange = (ev: any) => {
    console.log('Accordian changed', ev.detail.value)
    if (ev.detail.value.length != 0) {
      let char = null
      if (typeof ev.detail.value === 'object') {
        char = ev.detail.value[ev.detail.value.length - 1].split(',')[1]
        let makeIndex = Number(char)
        this.items[makeIndex].clicked = true
      } else if (typeof ev.detail.value === 'string') {
        console.profile(ev)
      }
    }
  }

  trackByItem (index: number, item: any) {
    return item._id
  }

  selectAllMakes () {}
}
