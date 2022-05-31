import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SettingsComponent } from '../Components/settings/settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppSharedModule } from '../Components/Shared/shared.module';
import { SwiperModule } from "swiper/angular";
import { FiltersComponent } from '../Models/filters/filters.component';
import { FilterHeadingComponent } from './filter-heading/filter-heading.component';
import { InventoryItemComponent } from './inventory-item/inventory-item.component';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SwiperModule,
    Tab1PageRoutingModule,
    TranslateModule,
    AppSharedModule
  ],
  declarations: [Tab1Page,SettingsComponent,FiltersComponent,FilterHeadingComponent,InventoryItemComponent]
})
export class Tab1PageModule {}
