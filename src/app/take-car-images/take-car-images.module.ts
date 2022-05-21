import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TakeCarImagesPageRoutingModule } from './take-car-images-routing.module';
import { AppSharedModule } from '../Components/Shared/shared.module';
import { TakeCarImagesPage } from './take-car-images.page';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CarInfoModalComponent } from '../Models/car-info-modal/car-info-modal.component';
import { ItemBodyComponent } from '../Components/item-body/item-body.component';
import { ItemColorComponent } from '../Components/item-color/item-color.component';
import { MainItemComponent } from '../Components/main-item/main-item.component';
import { SpecialPlansComponent } from '../Components/special-plans/special-plans.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakeCarImagesPageRoutingModule,
    AppSharedModule,
    DragDropModule,
  ],
  declarations: [TakeCarImagesPage,CarInfoModalComponent,ItemBodyComponent,ItemColorComponent,MainItemComponent,SpecialPlansComponent]
})
export class TakeCarImagesPageModule {}
