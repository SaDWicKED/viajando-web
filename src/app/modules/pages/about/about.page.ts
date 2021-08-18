import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SidenavService} from "../../shared/services/sidenav.service";
import {HeaderService} from "../../shared/ui/header/header.service";
import {PolicyComponent} from "./policy/policy.component";
import {RedirectionService} from "../../shared/services/redirection.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnDestroy {

  constructor(private dialog: MatDialog,
              private sidenavService: SidenavService,
              private headerService: HeaderService,
              private redirectionService: RedirectionService) {
    headerService.setHeight(65);
    redirectionService.setReturnURL('/about')
  }

  onPolicyClick(): void {
    this.dialog.open(PolicyComponent, {
      height: '80%',
    });
  }

  ngOnDestroy(): void {
    this.headerService.setHeight(300);
  }
}
