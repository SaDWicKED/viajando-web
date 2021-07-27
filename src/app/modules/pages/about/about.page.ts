import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SidenavService} from "../../shared/services/sidenav.service";
import {HeaderService} from "../../ui/header/header.service";
import {PolicyComponent} from "./policy/policy.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss']
})
export class AboutPage implements OnDestroy {

  constructor(private dialog: MatDialog,
              private sidenavService: SidenavService,
              private headerService: HeaderService) {
    headerService.setHeight(65);
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
