import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SettingsComponent } from '../Components/settings/settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '../Components/Shared/shared.module';

import { FiltersComponent } from '../Models/filters/filters.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    
    Tab1PageRoutingModule,
    TranslateModule,
    AppSharedModule,
  ],
  declarations: [Tab1Page,SettingsComponent,FiltersComponent]
})
export class Tab1PageModule {}
