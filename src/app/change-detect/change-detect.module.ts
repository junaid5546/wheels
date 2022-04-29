import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeDetectPageRoutingModule } from './change-detect-routing.module';

import { ChangeDetectPage } from './change-detect.page';
import { FirstComComponent } from '../Components/first-com/first-com.component';
import { SecComponent } from '../Components/sec-com/sec-com.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeDetectPageRoutingModule
  ],
  declarations: [ChangeDetectPage,FirstComComponent,SecComponent]
})
export class ChangeDetectPageModule {}
