import {  NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as Component from '../../Models/filters/index'
import { FilterPage } from './filter.page';

const routes: Routes = [
  {
    path: '',
    component:FilterPage,
    children:[
      {
        component:Component.FilterItemListComponent,
        path:'list'
      },
      {
        component:Component.FilterItemAccordianComponent,
        path:'accordion'
      },
      {
        component:Component.FilterItemGridComponent,
        path:'grid'
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterPageRoutingModule {}
