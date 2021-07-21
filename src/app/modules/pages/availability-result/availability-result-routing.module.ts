import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AvailabilityResultPage} from "./availability-result.page";

const routes: Routes = [
  {
    path: '',
    component: AvailabilityResultPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvailabilityResultRoutingModule { }
