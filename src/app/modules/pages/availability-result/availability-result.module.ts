import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityResultRoutingModule } from './availability-result-routing.module';
import { AvailabilityResultPage } from './availability-result.page';
import { AvailabilityCardComponent } from './availability-card/availability-card.component';
import { BusCardComponent } from './bus-card/bus-card.component';
import { BusComponent } from './bus-card/bus/bus.component';
import { BusSeatComponent } from './bus-card/bus/bus-seat/bus-seat.component';
import {MaterialModule} from "../../material/material.module";


@NgModule({
  declarations: [
    AvailabilityResultPage,
    AvailabilityCardComponent,
    BusCardComponent,
    BusComponent,
    BusSeatComponent
  ],
  imports: [
    CommonModule,
    AvailabilityResultRoutingModule,
    MaterialModule
  ],
})
export class AvailabilityResultModule { }
