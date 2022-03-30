import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() loginEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {}

  navigateToRegister(){
    console.log("child clicking");
    this.loginEvent.emit(0);
  }
}
