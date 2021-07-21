import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityPage } from './availability.page';


@NgModule({
  declarations: [
    AvailabilityPage
  ],
  imports: [
    CommonModule,
    AvailabilityRoutingModule
  ]
})
export class AvailabilityModule { }
