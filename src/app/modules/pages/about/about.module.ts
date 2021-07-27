import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutPage } from './about.page';
import { PolicyComponent } from './policy/policy.component';
import {MaterialModule} from "../../material/material.module";


@NgModule({
  declarations: [
    AboutPage,
    PolicyComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MaterialModule
  ]
})
export class AboutModule { }
