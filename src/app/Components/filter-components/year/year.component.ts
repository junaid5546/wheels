import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { filter } from '../../../Interface/car-filter';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss'],
})
export class YearComponent implements OnInit {

  allComplete: boolean = false;
  task: Task = {
    name: 'Select All',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: '2002', completed: false, color: 'primary'},
      {name: '2003', completed: false, color: 'warn'},
    ],
  };
  constructor() { }

  ngOnInit() {}

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
