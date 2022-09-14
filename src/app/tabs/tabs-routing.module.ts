import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        data: { animation: 'vehicles-department' } ,
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        data: { animation: 'post-details' } ,
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'post-details',
        loadChildren: () => import('../Pages/post-details/post-details.module').then( m => m.PostDetailsPageModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('../Pages/posts/posts.module').then( m => m.PostsPageModule)
      },
      {
        path: 'vehicles-department/:type',
        loadChildren: () => import('../pages/vehicles-department/vehicles-department.module').then( m => m.VehiclesDepartmentPageModule)
      },
      {
        path: 'vehicle-numbers',
        loadChildren: () => import('../Modules/vehicle-numbers/vehicle-numbers.module').then( m => m.VehicleNumbersPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab2',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
