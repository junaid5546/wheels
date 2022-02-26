import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { ContactUsComponent  } from '../contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children:[
        {
            path:'contact-us',
            component:ContactUsComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
