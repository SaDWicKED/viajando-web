import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelHistoryRoutingModule } from './travel-history-routing.module';
import { TravelHistoryPage } from './travel-history.page';


@NgModule({
  declarations: [
    TravelHistoryPage
  ],
  imports: [
    CommonModule,
    TravelHistoryRoutingModule
  ]
})
export class TravelHistoryModule { }
