import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AvailabilityPage} from "./availability.page";

const routes: Routes = [
  {
    path: '',
    component: AvailabilityPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabilityRoutingModule { }
