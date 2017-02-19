import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoggedOutGuard } from './login.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
