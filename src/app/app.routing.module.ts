import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'login', loadChildren: './loginRegister/login.module#LoginModule' },
  { path: 'container', loadChildren: './container/container.module#ContainerModule' },
  { path: '', redirectTo: 'container', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
