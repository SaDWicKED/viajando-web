import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateAccountRoutingModule } from './activate-account-routing.module';
import { ActivateAccountPage } from './activate-account.page';
import {MaterialModule} from "../../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ActivateAccountPage
  ],
  imports: [
    CommonModule,
    ActivateAccountRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ActivateAccountModule { }
