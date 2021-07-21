import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityResultRoutingModule } from './availability-result-routing.module';
import { AvailabilityResultPage } from './availability-result.page';


@NgModule({
  declarations: [
    AvailabilityResultPage
  ],
  imports: [
    CommonModule,
    AvailabilityResultRoutingModule
  ]
})
export class AvailabilityResultModule { }
