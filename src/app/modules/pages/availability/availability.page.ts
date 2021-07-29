import { Component } from '@angular/core';
import {HeaderService} from "../../ui/header/header.service";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.page.html',
  styleUrls: ['./availability.page.scss']
})
export class AvailabilityPage {

  constructor(private headerService: HeaderService) {
    this.headerService.setTitle('Disponibilidad');
  }

}
