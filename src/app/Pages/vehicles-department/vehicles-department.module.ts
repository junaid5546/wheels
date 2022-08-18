import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiclesDepartmentPageRoutingModule } from './vehicles-department-routing.module';

import { VehiclesDepartmentPage } from './vehicles-department.page';
import { AppSharedModule } from 'src/app/Components/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiclesDepartmentPageRoutingModule,
    AppSharedModule,
    

    
  ],
  declarations: [VehiclesDepartmentPage,]
})
export class VehiclesDepartmentPageModule {}
