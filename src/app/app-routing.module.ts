import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'take-car-images',
    loadChildren: () => import('./Pages/take-car-images/take-car-images.module').then( m => m.TakeCarImagesPageModule)
  },
  {
    path: 'post-details',
    loadChildren: () => import('./Pages/post-details/post-details.module').then( m => m.PostDetailsPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./Pages/filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'personal-information',
    loadChildren: () => import('./Pages/personal-information/personal-information.module').then( m => m.PersonalInformationPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
