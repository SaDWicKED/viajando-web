import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FaqsPage} from "./faqs.page";

const routes: Routes = [
  {
    path: '',
    component: FaqsPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqsRoutingModule { }
