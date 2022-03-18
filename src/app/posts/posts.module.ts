import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppSharedModule } from '../Components/Shared/shared.module';
import { PostsPageRoutingModule } from './posts-routing.module';
import { SwiperModule } from "swiper/angular";
import { PostsPage } from './posts.page';
import { FiltersComponent } from '../Models/filters/filters.component';

@NgModule({
  imports: [
    AppSharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    PostsPageRoutingModule
  ],
  declarations: [PostsPage,FiltersComponent]
  
})
export class PostsPageModule {}
