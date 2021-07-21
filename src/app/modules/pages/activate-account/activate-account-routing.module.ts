import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ActivateAccountPage} from "./activate-account.page";

const routes: Routes = [
  {
    path: '',
    component: ActivateAccountPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivateAccountRoutingModule { }
