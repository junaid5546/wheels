import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    SettingsRoutingModule,
  ],
  declarations: [ContactUsComponent]
})
export class Tab1PageModule {}
