import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiclesDepartmentPage } from './vehicles-department.page';

const routes: Routes = [
  {
    path: '',
    component: VehiclesDepartmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesDepartmentPageRoutingModule {}
