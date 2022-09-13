import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceComponent } from 'src/app/Components/filter-components/insurance/insurance.component';
import { WarrantyDurationComponent } from 'src/app/Components/filter-components/warranty-duration/warranty-duration.component';
import { BodyComponent } from '../../Components/filter-components/body/body.component';
import { ConditionComponent } from '../../Components/filter-components/condition/condition.component';
import { CylindersComponent } from '../../Components/filter-components/cylinders/cylinders.component';
import { DoorsComponent } from '../../Components/filter-components/doors/doors.component';
import { DrivetrainComponent } from '../../Components/filter-components/drivetrain/drivetrain.component';
import { EngineSizeComponent } from '../../Components/filter-components/engine-size/engine-size.component';
import { ExteriorColorComponent } from '../../Components/filter-components/exterior-color/exterior-color.component';
import { FuelComponent } from '../../Components/filter-components/fuel/fuel.component';
import { InteriorColorComponent } from '../../Components/filter-components/interior-color/interior-color.component';
import { LocationComponent } from '../../Components/filter-components/location/location.component';
import { MakeModelComponent } from '../../Components/filter-components/make-model/make-model.component';
import { OriginComponent } from '../../Components/filter-components/origin/origin.component';
import { PlateComponent } from '../../Components/filter-components/plate/plate.component';
import { PriceComponent } from '../../Components/filter-components/price/price.component';
import { ReadlinessComponent } from '../../Components/filter-components/readliness/readliness.component';
import { SaleTypeComponent } from '../../Components/filter-components/sale-type/sale-type.component';
import { SeatsComponent } from '../../Components/filter-components/seats/seats.component';
import { TransmissionComponent } from '../../Components/filter-components/transmission/transmission.component';
import { YearComponent } from '../../Components/filter-components/year/year.component';
import { FilterPage } from './filter.page';

const routes: Routes = [
  {
    path: '',
    component:FilterPage,
    children:[
      {
        component:BodyComponent,            //1
        path:'Kbody'
      },
      {
        component:MakeModelComponent,       //2
        path:''
      },
      {
        component:PriceComponent,           //3
        path:'price'
      },
      {
        component:ConditionComponent,       //4
        path:'Condition'
      },
      {
        component:YearComponent,            //5
        path:'Kyear'
      },
      {
        component:ExteriorColorComponent,  //6
        path:'exterior_color'
      },
      {
        component:InteriorColorComponent,  //7
        path:'interior_color'
      },
      {
        component:DoorsComponent,         //8
        path:'Kdoor'
      },
      {
        component:CylindersComponent,     //9
        path:'cylinder_count'
      },
      {
        component:EngineSizeComponent,    //10
        path:'engine_size'
      },
      {
        component:FuelComponent,          //11
        path:'fuel'
      },
      {
        component:TransmissionComponent,  //12
        path:'transmission'
      },
      {
        component:DrivetrainComponent,    //13
        path:'car-drivetrain-type'
      },
      {
        component:SeatsComponent,         //14
        path:'seats'
      },
      {
        component:OriginComponent,        //15
        path:'origin'
      },
      {
        component:LocationComponent,      //16
        path:'car-location'
      },
      {
        component:PlateComponent,         //17
        path:'plate_type'
      },
      {
        component:ReadlinessComponent,    //18
        path:'driving_readiness'
      },
      {
        component:SaleTypeComponent,      //19
        path:'sale_type'
      },
      {
        component:InsuranceComponent,      //19
        path:'car-insurance'
      },
      {
        component:WarrantyDurationComponent,      //19
        path:'car-warranty-duration'
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterPageRoutingModule {}
