import {Component, OnInit} from '@angular/core';
import {HeaderService} from "../../ui/header/header.service";
import {Agency} from "../../api/availability/models/agency";
import {RedirectionService} from "../../shared/services/redirection.service";
import {DispService} from "../../api/availability/services/disp.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AgencyDetailComponent} from "./agency-detail/agency-detail.component";

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.page.html',
  styleUrls: ['./agencies.page.scss']
})
export class AgenciesPage implements OnInit {

  agencies: Agency[];
  provinces = ['Artemisa', 'Camagüey', 'Ciego de Ávila', 'Cienfuegos',
    'Granma', 'Guantánamo', 'Holguín', 'Isla de la Juventud', 'La Habana',
    'Las Tunas', 'Matanzas', 'Mayabeque', 'Pinar del Río', 'Sancti Spíritus',
    'Santiago de Cuba', 'Villa Clara'
  ];

  constructor(private headerService: HeaderService,
              private redirectionService: RedirectionService,
              private agencyService: DispService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
    headerService.setTitle('Agencias');
    this.agencies = [];
  }

  ngOnInit(): void {
    this.agencyService.agencies().subscribe(agencies => {
      this.agencies = agencies;
    });
    this.redirectionService.setReturnURL(this.route.snapshot.url.toString());
  }

  filterAgencyByName(name: string): Agency[] {
    return this.agencies.filter(agency => agency.province === name);
  }

  onRowClicked(agency: Agency): void {
    this.dialog.open(AgencyDetailComponent, {
      data: agency,
    });
  }
}
