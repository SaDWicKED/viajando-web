import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../ui/header/header.service";

@Component({
  selector: 'app-availability',
  templateUrl: './availability.page.html',
  styleUrls: ['./availability.page.scss']
})
export class AvailabilityPage implements OnInit {

  constructor(private headerService: HeaderService) {
    this.headerService.setTitle('Disponibilidad');
  }

  ngOnInit(): void {
  }

}
