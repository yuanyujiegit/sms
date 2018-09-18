import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';

const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  // { path: '', redirectTo: 'login', pathMatch: 'full'},
  // { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {}
