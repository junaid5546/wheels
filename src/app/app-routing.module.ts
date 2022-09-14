import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
  {
    path: 'posts',
    loadChildren: () => import('./Pages/posts/posts.module').then( m => m.PostsPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./Pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  }
 
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
