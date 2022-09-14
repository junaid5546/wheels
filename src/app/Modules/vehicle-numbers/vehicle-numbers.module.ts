import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleNumbersPageRoutingModule } from './vehicle-numbers-routing.module';

import { VehicleNumbersPage } from './vehicle-numbers.page';
import { AppSharedModule } from 'src/app/Components/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleNumbersPageRoutingModule,
    AppSharedModule
  ],
  declarations: [VehicleNumbersPage]
})
export class VehicleNumbersPageModule {}
