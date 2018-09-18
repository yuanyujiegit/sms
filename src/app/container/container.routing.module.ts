import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { OrgComponent } from './org/org.component';
import {ContainerComponent} from './container.component';

const containerRoutes: Routes = [
  // { path: 'org', component: OrgComponent },
  {
    path: 'container',
    component: ContainerComponent,
    children: [
      { path: '', redirectTo: 'org', pathMatch: 'full'},
      {
        path: 'org',
        component: OrgComponent
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(containerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContainerRoutingModule {}
