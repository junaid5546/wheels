import { Component, OnInit } from '@angular/core';
import { TodoInterface } from '../first-com/first-com.component'; 
@Component({
  selector: 'app-sec-com',
  templateUrl: './sec-com.component.html',
  styleUrls: ['./sec-com.component.scss'],
})

export class SecComponent {
  input:string = null;

  todos: any[] = [
    {
      id: '1',
      text: 'First todo',
      isCompleted: true,
    },
    {
      id: '2',
      text: 'Second todo',
      isCompleted: true,
    },

    {
      id: '3',
      text: 'Third todo',
      isCompleted: false,
    },
  ];

  changeText(e): void {
    console.log('changeText',e);
    this.input  = e.detail.value;
  }

  changeArray(): void {
    /* this.todos[0].text = 'Foo'; */
    this.todos[0] = { ...this.todos[0], text: this.input };
    console.log(this.todos);
  }
}