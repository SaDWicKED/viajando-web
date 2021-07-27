import { Injectable } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginRequestComponent} from "../../ui/login-redirection/login-request.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService,
              private dialog: MatDialog) {}

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginRequestComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.openLoginDialog();
      return false;
    }
    return true;
  }
}
