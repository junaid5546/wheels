import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IonicModule } from '@ionic/angular';
import { FilterPageRoutingModule } from './filter-routing.module';
import { FilterPage } from './filter.page';
import { AppSharedModule } from '../../Components/Shared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { DigitTransformation } from 'src/app/Pipe/digit-transform.pipe';
import { FilterItemAccordianComponent } from 'src/app/Models/filters/filter-item-accordian/filter-item-accordian.component';
import { FilterItemGridComponent } from 'src/app/Models/filters/filter-item-grid/filter-item-grid.component';
import { FilterItemListComponent } from 'src/app/Models/filters/filter-item-list/filter-item-list.component';
@NgModule({
  imports: [
    MatSliderModule,
    ScrollingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AppSharedModule,
    MatCheckboxModule,
    FilterPageRoutingModule,
    TranslateModule,
  ],

  declarations: [
    DigitTransformation,
    FilterPage,
    FilterItemAccordianComponent,
    FilterItemGridComponent,
    FilterItemListComponent
  ],
})
export class FilterPageModule {}
