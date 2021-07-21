import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelersRoutingModule } from './travelers-routing.module';
import { TravelersPage } from './travelers.page';


@NgModule({
  declarations: [
    TravelersPage
  ],
  imports: [
    CommonModule,
    TravelersRoutingModule
  ]
})
export class TravelersModule { }
