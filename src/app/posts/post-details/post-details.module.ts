import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostDetailsPageRoutingModule } from './post-details-routing.module';

import { PostDetailsPage } from './post-details.page';
import { AppSharedModule } from 'src/app/Components/Shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    FormsModule,
    IonicModule,
    PostDetailsPageRoutingModule
  ],
  declarations: [PostDetailsPage]
})
export class PostDetailsPageModule {}
