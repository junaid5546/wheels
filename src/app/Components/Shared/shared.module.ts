import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { setTranslateLoader } from "../../app.module";
import * as COMPONENT from ".";

@NgModule({
    imports: [
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

    declarations: [COMPONENT.HeaderComponent],
    entryComponents: [COMPONENT.HeaderComponent],
    exports: [COMPONENT.HeaderComponent],
    
  })
  export class AppSharedModule {
    static forRoot() {
      return {
        ngModule: AppSharedModule,
      };
    }
  }