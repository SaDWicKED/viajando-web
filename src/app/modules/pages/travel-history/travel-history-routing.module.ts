import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TravelHistoryPage} from "./travel-history.page";
import {AuthGuardService} from "../../shared/core/guards/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: TravelHistoryPage,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelHistoryRoutingModule { }
