import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContainerRoutingModule } from './container.routing.module';
import { ContainerComponent } from './container.component';
import { OrgComponent } from './org/org.component';
import { HeaderComponent } from '../component';
import { SidebarComponent } from '../component/sidebar/sidebar.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ContainerComponent,
    OrgComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ContainerRoutingModule
  ],
  providers: [],
})
export class ContainerModule {}

