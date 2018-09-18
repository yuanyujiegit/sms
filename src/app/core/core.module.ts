import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './http-interceptor/noop.interceptor';

import {
  UtilService,
  LoginService,
  Base64Service
} from './service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    UtilService,
    LoginService,
    Base64Service
  ],
  declarations: []
})
export class CoreModule {}
