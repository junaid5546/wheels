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
import { WarrantyDurationComponent } from 'src/app/Components/filter-components/warranty-duration/warranty-duration.component';
import { PlateComponent } from 'src/app/Components/filter-components/plate/plate.component';
import { FuelComponent } from 'src/app/Components/filter-components/fuel/fuel.component';
import { OriginComponent } from 'src/app/Components/filter-components/origin/origin.component';
import { EngineSizeComponent } from 'src/app/Components/filter-components/engine-size/engine-size.component';
import { CylindersComponent } from 'src/app/Components/filter-components/cylinders/cylinders.component';
import { DoorsComponent } from 'src/app/Components/filter-components/doors/doors.component';
import { TransmissionComponent } from 'src/app/Components/filter-components/transmission/transmission.component';
import { DrivetrainComponent } from 'src/app/Components/filter-components/drivetrain/drivetrain.component';
import { SeatsComponent } from 'src/app/Components/filter-components/seats/seats.component';
import { InsuranceComponent } from 'src/app/Components/filter-components/insurance/insurance.component';
import { ReadlinessComponent } from 'src/app/Components/filter-components/readliness/readliness.component';
import { SaleTypeComponent } from 'src/app/Components/filter-components/sale-type/sale-type.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSliderModule,
    FormsModule,
    IonicModule,
    AppSharedModule,
    MatCheckboxModule,
    FilterPageRoutingModule,
    
  ],

  declarations: [FilterPage,MakeModelComponent,PriceComponent,BodyComponent,ConditionComponent,YearComponent,ExteriorColorComponent,InteriorColorComponent,WarrantyDurationComponent,PlateComponent,FuelComponent,OriginComponent,EngineSizeComponent,CylindersComponent,DoorsComponent,TransmissionComponent,DrivetrainComponent,SeatsComponent,InsuranceComponent,ReadlinessComponent,SaleTypeComponent]
})
export class FilterPageModule {}
