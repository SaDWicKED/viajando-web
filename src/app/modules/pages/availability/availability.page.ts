import { Component } from '@angular/core';
import {HeaderService} from "../../ui/header/header.service";
import {RedirectionService} from "../../shared/services/redirection.service";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.page.html',
  styleUrls: ['./availability.page.scss']
})
export class AvailabilityPage {

  constructor(private headerService: HeaderService,
              private redirectionService: RedirectionService,) {
    this.headerService.setTitle('Disponibilidad');
    this.redirectionService.setReturnURL('/');
  }

}
