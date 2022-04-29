import { Component, Input, ChangeDetectionStrategy,OnInit } from '@angular/core';
import { DeviceInfoService } from '../../Services/device-info.service';
import { Observable } from 'rxjs';
export interface TodoInterface {
  id: string;
  text: string;
  isCompleted: boolean;
}
@Component({
  selector: 'app-first-com',
  templateUrl: './first-com.component.html',
  styleUrls: ['./first-com.component.scss']
})
export class FirstComComponent implements OnInit {



  @Input('todo') todoProps: TodoInterface;

  ngOnInit() {
        this.filter$ = this.todosService.filter$;
        
  }

  filter$: Observable<string>;

  constructor(private todosService: DeviceInfoService) {


  }


  checkRender(): boolean {
    console.log('checkRender');
    return true;
  }

  changeText(): void {
    this.todoProps.text = 'Changed from inside';
  }

  changeFilter(): void {
    this.todosService.filter$.next('active');
  }
}
