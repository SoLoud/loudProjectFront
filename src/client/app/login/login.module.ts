import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from '../formError/formError.module';
import { LoginRoutingModule } from './login-routing.module';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { LoginService, LoggedInGuard, LoggedOutGuard } from './login.service';

let toastOpt = new ToastOptions({
  // positionClass: 'toast-bottom-full-width'
});

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, LoginRoutingModule, CommonModule, FormErrorModule, ToastModule.forRoot(toastOpt), HttpModule, SharedModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [LoginService, LoggedInGuard, LoggedOutGuard]
})
export class LoginModule { }
