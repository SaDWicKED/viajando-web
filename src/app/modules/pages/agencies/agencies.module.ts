import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgenciesRoutingModule } from './agencies-routing.module';
import { AgenciesPage } from './agencies.page';
import {MaterialModule} from "../../material/material.module";
import { AgencyDetailComponent } from './agency-detail/agency-detail.component';


@NgModule({
  declarations: [
    AgenciesPage,
    AgencyDetailComponent
  ],
  imports: [
    CommonModule,
    AgenciesRoutingModule,
    MaterialModule
  ],
})
export class AgenciesModule { }
