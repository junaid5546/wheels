import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';
import { SwiperModule } from "swiper/angular";
import { FilterHeadingComponent } from './filter-heading/filter-heading.component';
import { InventoryItemComponent } from './inventory-item/inventory-item.component';
import { PostsPage } from './posts.page';
import { AppSharedModule } from 'src/app/Components/Shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    IonicModule,
    PostsPageRoutingModule,
    AppSharedModule,
    TranslateModule
  ],
  declarations: [PostsPage,InventoryItemComponent,FilterHeadingComponent]
})
export class PostsPageModule {}
