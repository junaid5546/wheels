import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGurad_dm } from '../../Guards/authentication.guard';
import { PersonalInformationPage } from './personal-information.page';

const routes: Routes = [
  {
    canActivate:[AuthenticationGurad_dm],
    path: '',
    component: PersonalInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInformationPageRoutingModule {}
