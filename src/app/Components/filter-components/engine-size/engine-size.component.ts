import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';
import {ThemePalette} from '@angular/material/core';
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: any[];
}
@Component({
  selector: 'app-engine-size',
  templateUrl: './engine-size.component.html',
  styleUrls: ['./engine-size.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EngineSizeComponent implements OnInit {
  checked: boolean = false;
  label: string = null;
  exteriorColors: any = null;
  color:string = "primary";

  task: Task = {
    name: 'Select All',
    completed: false,
    color: 'primary',
    subtasks: [],
  };

  allComplete: boolean = false;
  constructor(private carFilter:CarFiltersService,private activated:ActivatedRoute,public userData:UserDataService) { }
  
  ngOnInit(): void {
    this.label = this.activated.snapshot.params.label;
    console.log('On init called Engine size',);
    this.task.subtasks = this.carFilter.getEngineSize();
    this.carFilter.filterObject[this.label] = [];
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
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

}


