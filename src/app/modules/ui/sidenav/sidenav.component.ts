import { Component } from '@angular/core';
import {SidenavService} from "../../shared/services/sidenav.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  opened: boolean;
  constructor( private sidenavService: SidenavService ) {
    this.opened = false;
    this.sidenavService.openedSubject.subscribe(opened => {
      this.opened = opened;
    });
  }

}
