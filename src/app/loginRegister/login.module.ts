import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login.routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    LoginRoutingModule
  ],
  providers: [],
})
export class LoginModule {}
