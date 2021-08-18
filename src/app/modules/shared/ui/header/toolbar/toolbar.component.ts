import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {SidenavService} from "../../../services/sidenav.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  username: string | undefined;

  constructor(public authService: AuthService,
              private sidenavService: SidenavService) {
    this.username = '';
  }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(user => {
      this.username = user?.firstName;
    })
  }

  toggleSidenav(): void {
    this.sidenavService.toggleSidenav();
  }
}
