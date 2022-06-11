import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IonicModule } from '@ionic/angular';
import { FilterPageRoutingModule } from './filter-routing.module';
import { FilterPage } from './filter.page';
import { AppSharedModule } from '../../Components/Shared/shared.module';
import { MakeModelComponent } from '../../Components/filter-components/make-model/make-model.component';
import { PriceComponent } from '../../Components/filter-components/price/price.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BodyComponent } from '../../Components/filter-components/body/body.component';
import { ConditionComponent } from '../../Components/filter-components/condition/condition.component';
import { YearComponent } from '../../Components/filter-components/year/year.component';
import { ExteriorColorComponent } from '../../Components/filter-components/exterior-color/exterior-color.component';
import { InteriorColorComponent } from '../../Components/filter-components/interior-color/interior-color.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSliderModule,
    FormsModule,
    IonicModule,
    AppSharedModule,
    MatCheckboxModule,
    FilterPageRoutingModule
  ],

  declarations: [FilterPage,MakeModelComponent,PriceComponent,BodyComponent,ConditionComponent,YearComponent,ExteriorColorComponent,InteriorColorComponent]
})
export class FilterPageModule {}
