import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormErrorComponent } from './formError.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [FormErrorComponent],
  exports: [FormErrorComponent]
})
export class FormErrorModule { }
