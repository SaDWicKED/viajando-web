import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserProfilePage} from "./user-profile.page";
import {AuthGuardService} from "../../shared/core/guards/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
