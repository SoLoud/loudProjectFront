import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { ContestsListComponent, ContestsCreateComponent } from './contests.component';
import { LoggedInGuard } from '../login/login.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'contests', component: ContestsListComponent, canActivate: [LoggedInGuard] },
      { path: 'contests/create', component: ContestsCreateComponent, canActivate: [LoggedInGuard] },
    ])
  ],
  exports: [RouterModule]
})
export class ContestsRoutingModule { }
