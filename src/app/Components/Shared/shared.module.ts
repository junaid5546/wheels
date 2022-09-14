import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { setTranslateLoader } from "../../app.module";
import * as COMPONENT from ".";
import { SwiperModule } from 'swiper/angular';
@NgModule({
    imports: [
      SwiperModule,
      CommonModule,
      RouterModule,
      IonicModule,
      TranslateModule.forChild({
        loader: {
          provide: TranslateLoader,
          useFactory: setTranslateLoader,
          deps: [HttpClient],
        },
      }),
      FormsModule,
    ],

    declarations: [COMPONENT.HeaderComponent,
                   COMPONENT.VerticalListComponent,
                    COMPONENT.AskPermissionComponent,
                    COMPONENT.ImagePreviewComponent,
                    COMPONENT.SpecialPlanItemComponent,
                    COMPONENT.PostItemSkeletonComponent,
                    COMPONENT.TextInputComponent,
                    COMPONENT.MainItemComponent,
                    COMPONENT.NumberPlateComponent,
                    COMPONENT.CountryCodePickerComponent,
                    COMPONENT.AddSliderComponent]
                    ,
    entryComponents: [COMPONENT.HeaderComponent,
                      COMPONENT.VerticalListComponent,
                      COMPONENT.AskPermissionComponent,
                      COMPONENT.ImagePreviewComponent,
                      COMPONENT.SpecialPlanItemComponent,
                      COMPONENT.PostItemSkeletonComponent,
                      COMPONENT.TextInputComponent,
                      COMPONENT.MainItemComponent,
                      COMPONENT.NumberPlateComponent,
                      COMPONENT.CountryCodePickerComponent,
                      COMPONENT.AddSliderComponent],

    exports: [COMPONENT.HeaderComponent,
              COMPONENT.ImagePreviewComponent,
              COMPONENT.AskPermissionComponent,
              COMPONENT.VerticalListComponent,
              COMPONENT.SpecialPlanItemComponent,
              COMPONENT.PostItemSkeletonComponent,
              COMPONENT.TextInputComponent,
              COMPONENT.MainItemComponent,
              COMPONENT.NumberPlateComponent,
              COMPONENT.CountryCodePickerComponent,
              COMPONENT.AddSliderComponent]

  })
  export class AppSharedModule {
    static forRoot() {
      return {
        ngModule: AppSharedModule,
      };
    }
  }