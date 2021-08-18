import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TravelersPage} from "./travelers.page";
import {AuthGuardService} from "../../shared/core/guards/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: TravelersPage,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelersRoutingModule { }
