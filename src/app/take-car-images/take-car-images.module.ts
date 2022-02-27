import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TakeCarImagesPageRoutingModule } from './take-car-images-routing.module';
import { AppSharedModule } from '../Components/Shared/shared.module';
import { TakeCarImagesPage } from './take-car-images.page';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakeCarImagesPageRoutingModule,
    AppSharedModule,
    DragDropModule
  ],
  declarations: [TakeCarImagesPage]
})
export class TakeCarImagesPageModule {}
