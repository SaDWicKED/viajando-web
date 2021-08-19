import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BusComponent} from "./bus/bus.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NavigationStatusService} from "../../../shared/services/navigation-status.service";
import {BusInfo} from "../availability-card/availability-card.component";
import {BusService} from "./bus/bus.service";

@Component({
  selector: 'app-bus-card',
  templateUrl: './bus-card.component.html',
  styleUrls: ['./bus-card.component.scss'],
  providers: [BusService]
})
export class BusCardComponent implements OnInit {

  travelType: string | undefined;

  @ViewChild('bus', {static: true}) bus: BusComponent | undefined;


  constructor(private dialogRef: MatDialogRef<BusCardComponent>,
              private navigationStatusService: NavigationStatusService,
              @Inject(MAT_DIALOG_DATA) public data: BusInfo) {
    dialogRef.disableClose = true;
  }


  ngOnInit(): void {
    this.travelType = this.navigationStatusService.travelType;

    if (this.travelType === 'ida') {
      this.navigationStatusService.numberOfSeatsSelectedDep = 0;
      this.navigationStatusService.deleteDepBus();
    } else {
      this.navigationStatusService.numberOfSeatsSelectedCb = 0;
      this.navigationStatusService.deleteCbBus();
    }
  }

  onBooking(): void {
    if (this.data.travelType === 'ida') {
      this.navigationStatusService.setDepBus(this.bus!);
    } else {
      this.navigationStatusService.setCbBus(this.bus!);
    }
    this.dialogRef.close();
  }


}
