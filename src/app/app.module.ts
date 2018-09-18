import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { LoginModule } from './loginRegister';
import { ContainerModule } from './container';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LocalStorageModule.withConfig({prefix: 'ls', storageType: 'localStorage'}),
    BrowserAnimationsModule,
    NgZorroAntdModule,
    CoreModule,
    LoginModule,
    ContainerModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
