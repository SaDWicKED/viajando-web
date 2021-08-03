import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelersRoutingModule } from './travelers-routing.module';
import { TravelersPage } from './travelers.page';
import {MaterialModule} from "../../material/material.module";
import { TravelerCardComponent } from './traveler-card/traveler-card.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TravelersPage,
    TravelerCardComponent
  ],
  imports: [
    CommonModule,
    TravelersRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class TravelersModule { }
