import { Component, OnInit } from '@angular/core';
import {RedirectionService} from "../../shared/services/redirection.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-availability-result',
  templateUrl: './availability-result.page.html',
  styleUrls: ['./availability-result.page.scss']
})
export class AvailabilityResultPage implements OnInit {

  constructor(private redirectionService: RedirectionService,
              private router: Router) {
    redirectionService.setReturnURL(router.url);
  }

  ngOnInit(): void {
  }

}
