import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {SidenavService} from "../../../shared/services/sidenav.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();

  }
}
