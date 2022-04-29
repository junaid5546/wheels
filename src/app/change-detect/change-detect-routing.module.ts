import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeDetectPage } from './change-detect.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeDetectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeDetectPageRoutingModule {}
