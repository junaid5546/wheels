import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { AccountItemsListComponent } from './account-items-list/account-items-list.component';
import { AppSharedModule } from '../Components/Shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    AppSharedModule
  ],
  declarations: [Tab4Page, AccountItemsListComponent]
})
export class Tab4PageModule {}
