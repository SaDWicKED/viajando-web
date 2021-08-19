import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookingPage} from "./booking.page";
import {CanDeactivateGuard} from "../../core/guards/can-deactivate-guard.service";
import {BookingAccessGuard} from "./booking-access-guard.service";

const routes: Routes = [
  {
    path: '',
    component: BookingPage,
    canActivate: [BookingAccessGuard],
    canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
