import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NameListService } from './name-list/name-list.service';
import { HttpErrorHandlerService } from './Services/HttpErrorHandler.service';
import { LoginService } from '../login/login.service';
import { ModalComponent } from './modal/modal.component';
import { FileInputComponent } from './fileInput/file-input.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [ToolbarComponent, NavbarComponent, ModalComponent, FileInputComponent],
  exports: [ToolbarComponent, NavbarComponent, FileInputComponent,
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ModalComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService, HttpErrorHandlerService, LoginService]
    };
  }
}

// @NgModule({
//   imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
//   declarations: [ToolbarComponent, NavbarComponent],
//   exports: [ToolbarComponent, NavbarComponent,
//     CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
//   providers: [NameListService, HttpErrorHandlerService, LoginService]
// })
// export class SharedModule { }
