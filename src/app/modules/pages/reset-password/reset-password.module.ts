import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordPage } from './reset-password.page';
import {ReactiveFormsModule} from "@angular/forms";
import {MatPasswordStrengthModule} from "@angular-material-extensions/password-strength";
import {MaterialModule} from "../../material/material.module";


@NgModule({
  declarations: [
    ResetPasswordPage
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatPasswordStrengthModule
  ]
})
export class ResetPasswordModule { }
