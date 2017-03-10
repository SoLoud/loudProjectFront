import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { Md2Module } from 'md2';
import { ContestsRoutingModule } from './contests-routing.module';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { HttpModule } from '@angular/http';
import { LoginModule } from '../login/login.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorModule } from '../formError/formError.module'

import { ContestsListComponent, ContestsCreateComponent } from './contests.component';

let toastOpt = new ToastOptions({
  // positionClass: 'toast-bottom-full-width'
});

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ContestsRoutingModule, ToastModule.forRoot(toastOpt), HttpModule,
            LoginModule, SharedModule, FormErrorModule, MaterialModule, Md2Module.forRoot()],
  declarations: [ContestsListComponent, ContestsCreateComponent],
  exports: [ContestsListComponent, ContestsCreateComponent],
  entryComponents: [ContestsCreateComponent]
})
export class ContestsModule { }
