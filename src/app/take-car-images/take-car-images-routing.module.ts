import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeCarImagesPage } from './take-car-images.page';

const routes: Routes = [
  {
    path: '',
    component: TakeCarImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeCarImagesPageRoutingModule {}
