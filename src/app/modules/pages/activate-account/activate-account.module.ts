import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivateAccountRoutingModule } from './activate-account-routing.module';
import { ActivateAccountPage } from './activate-account.page';


@NgModule({
  declarations: [
    ActivateAccountPage
  ],
  imports: [
    CommonModule,
    ActivateAccountRoutingModule
  ]
})
export class ActivateAccountModule { }
