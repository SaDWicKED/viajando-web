import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';

import { AvailabilityRoutingModule } from './availability-routing.module';
import { AvailabilityPage } from './availability.page';
import { AvailabilityPanelComponent } from './availability-panel/availability-panel.component';
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_DATE_LOCALE} from "@angular/material/core";


@NgModule({
  declarations: [
    AvailabilityPage,
    AvailabilityPanelComponent
  ],
  imports: [
    CommonModule,
    AvailabilityRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class AvailabilityModule { }
