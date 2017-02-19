import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { ContestsComponent } from './contests.component';
import { LoggedInGuard } from '../login/login.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'contests', component: ContestsComponent, canActivate: [LoggedInGuard] }
    ])
  ],
  exports: [RouterModule]
})
export class ContestsRoutingModule { }
