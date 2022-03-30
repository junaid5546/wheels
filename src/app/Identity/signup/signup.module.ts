import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { SignupPage } from './signup.page';
import { AppSharedModule } from 'src/app/Components/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    AppSharedModule
  ],
  declarations: [SignupPage,RegisterComponent,LoginComponent]
})
export class SignupPageModule {}
