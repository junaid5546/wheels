import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  executeFunction(){
    console.log('Executing child');
    return 'Hello world'
  }
}
