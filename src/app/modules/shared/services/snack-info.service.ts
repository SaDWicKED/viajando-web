import { Injectable } from '@angular/core';
import {SnackInfoComponent} from "../../ui/snack-info/snack-info.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackInfoService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(msg: string) {
    this.snackBar.openFromComponent(SnackInfoComponent, {
      duration: 5 * 1000,
      panelClass: 'notif-success',
      data: {
        message: msg
      }
    });
  }
}
