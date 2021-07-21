import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TravelHistoryPage} from "./travel-history.page";

const routes: Routes = [
  {
    path: '',
    component: TravelHistoryPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelHistoryRoutingModule { }
