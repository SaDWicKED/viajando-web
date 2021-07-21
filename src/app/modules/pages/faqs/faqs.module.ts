import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqsRoutingModule } from './faqs-routing.module';
import { FaqsPage } from './faqs.page';


@NgModule({
  declarations: [
    FaqsPage
  ],
  imports: [
    CommonModule,
    FaqsRoutingModule
  ]
})
export class FaqsModule { }
