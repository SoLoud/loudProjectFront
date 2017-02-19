import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContestsRoutingModule } from './contests-routing.module';

import { ContestsComponent } from './contests.component';

@NgModule({
  imports: [CommonModule, ContestsRoutingModule],
  declarations: [ContestsComponent],
  exports: [ContestsComponent]
})
export class ContestsModule { }
