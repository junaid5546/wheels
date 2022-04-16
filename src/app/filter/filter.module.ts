import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IonicModule } from '@ionic/angular';

import { FilterPageRoutingModule } from './filter-routing.module';

import { FilterPage } from './filter.page';
import { AppSharedModule } from '../Components/Shared/shared.module';
import { MakeModelComponent } from '../Components/filter-components/make-model/make-model.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppSharedModule,
    MatCheckboxModule,
    FilterPageRoutingModule
  ],
  declarations: [FilterPage,MakeModelComponent]
})
export class FilterPageModule {}
