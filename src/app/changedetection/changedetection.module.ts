import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangedetectionPageRoutingModule } from './changedetection-routing.module';

import { ChangedetectionPage } from './changedetection.page';
import { ParentComponent } from '../Components/changeDetection/parent/parent.component';
import { ChildComponent } from '../Components/changeDetection/child/child.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangedetectionPageRoutingModule
  ],
  declarations: [ChangedetectionPage,ParentComponent,ChildComponent]
})
export class ChangedetectionPageModule {}
