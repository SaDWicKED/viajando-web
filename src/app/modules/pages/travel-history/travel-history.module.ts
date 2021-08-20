import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelHistoryRoutingModule } from './travel-history-routing.module';
import { TravelHistoryPage } from './travel-history.page';
import { TravelCardComponent } from './travel-card/travel-card.component';
import { TravelTicketListComponent } from './travel-ticket-list/travel-ticket-list.component';
import { TravelTicketDetailComponent } from './travel-ticket-detail/travel-ticket-detail.component';
import {MaterialModule} from "../../material/material.module";


@NgModule({
  declarations: [
    TravelHistoryPage,
    TravelCardComponent,
    TravelTicketListComponent,
    TravelTicketDetailComponent
  ],
  imports: [
    CommonModule,
    TravelHistoryRoutingModule,
    MaterialModule
  ]
})
export class TravelHistoryModule { }
