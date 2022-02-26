import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AppSharedModule } from '../Components/Shared/shared.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { AddItemComponent } from '../Components/add-item/add-item.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    AppSharedModule,
    TranslateModule
  ],
  declarations: [Tab2Page,AddItemComponent]
})
export class Tab2PageModule {}
