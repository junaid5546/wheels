import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { AppSharedModule } from '../Components/Shared/shared.module';
import { AdsComponent } from '../Components/ads/ads.component';
import { ItemTemplateComponent } from '../Components/ads/item-template/item-template.component';
import { FilterComponent } from '../Components/ads/filter/filter.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AppSharedModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [Tab3Page,AdsComponent,ItemTemplateComponent,FilterComponent]
})
export class Tab3PageModule {}
