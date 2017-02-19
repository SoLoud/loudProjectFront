import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { LoggedInGuard } from '../login/login.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'about', component: AboutComponent, canActivate: [LoggedInGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
