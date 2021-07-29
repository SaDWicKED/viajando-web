import { Component } from '@angular/core';
import {HeaderService} from "../../ui/header/header.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss']
})
export class NotFoundPage {

  constructor(private headerService: HeaderService) {
    this.headerService.setTitle('Error 404');
  }

}
