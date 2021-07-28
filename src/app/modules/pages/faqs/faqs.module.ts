import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqsRoutingModule } from './faqs-routing.module';
import { FaqsPage } from './faqs.page';
import {MaterialModule} from "../../material/material.module";


@NgModule({
  declarations: [
    FaqsPage
  ],
  imports: [
    CommonModule,
    FaqsRoutingModule,
    MaterialModule
  ]
})
export class FaqsModule { }
