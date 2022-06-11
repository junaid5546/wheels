import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonalInformationPageRoutingModule } from './personal-information-routing.module';
import { PersonalInformationPage } from './personal-information.page';
import { AppSharedModule } from 'src/app/Components/Shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalInformationPageRoutingModule,
    AppSharedModule
  ],
  
  declarations: [PersonalInformationPage]
})
export class PersonalInformationPageModule {}
