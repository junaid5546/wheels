import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleNumbersPage } from './vehicle-numbers.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleNumbersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleNumbersPageRoutingModule {}
