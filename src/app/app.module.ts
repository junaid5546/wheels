import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
Injectable()
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (setTranslateLoader),
      deps: [HttpClient]
    }
  }),
    BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Diagnostic,OpenNativeSettings,FilePath,WebView],
  bootstrap: [AppComponent],
})
export class AppModule {}
