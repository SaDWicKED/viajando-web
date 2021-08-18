import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingPage } from './booking.page';
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import {CanDeactivateGuard} from "../../shared/core/guards/can-deactivate-guard.service";


@NgModule({
  declarations: [
    BookingPage,
    TicketDetailComponent,
    TicketFormComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class BookingModule { }
