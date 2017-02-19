import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestsRoutingModule } from './contests-routing.module';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { HttpModule } from '@angular/http';
import { LoginModule } from '../login/login.module';

import { ContestsListComponent, ContestsCreateComponent } from './contests.component';

let toastOpt = new ToastOptions({
  // positionClass: 'toast-bottom-full-width'
});

@NgModule({
  imports: [CommonModule, ContestsRoutingModule, ToastModule.forRoot(toastOpt), HttpModule, LoginModule],
  declarations: [ContestsListComponent, ContestsCreateComponent],
  exports: [ContestsListComponent, ContestsCreateComponent]
})
export class ContestsModule { }
