import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoggedInGuard } from '../login/login.service'

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
