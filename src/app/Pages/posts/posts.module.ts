import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppSharedModule } from '../../Components/Shared/shared.module';
import { PostsPageRoutingModule } from './posts-routing.module';
import { PostsPage } from './posts.page';
import { FiltersComponent } from '../../Models/filters/filters.component';
import { SwiperModule } from "swiper/angular";
@NgModule({
  imports: [
    AppSharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule,
    SwiperModule
  ],
  declarations: [PostsPage]
  
})
export class PostsPageModule {}
