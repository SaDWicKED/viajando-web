import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityPage } from './availability.page';
import { AvailabilityCardComponent } from './availability-card/availability-card.component';
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AvailabilityPage,
    AvailabilityCardComponent
  ],
  imports: [
    CommonModule,
    AvailabilityRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],providers: [
    DatePipe,
  ]
})
export class AvailabilityModule { }
