import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  opened: boolean;
  openedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.opened = false
  }

  public toggleSidenav() {
    this.openedSubject.next(!this.opened);
  }

}
