import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Travel} from "../../../api/booking/models/travel";
import {DatePipe} from "@angular/common";
import {TravelTicketDetailComponent} from "../travel-ticket-detail/travel-ticket-detail.component";

@Component({
  selector: 'app-travel-ticket-list',
  templateUrl: './travel-ticket-list.component.html',
  styleUrls: ['./travel-ticket-list.component.scss']
})
export class TravelTicketListComponent {

  constructor(
    public dialogRef: MatDialogRef<TravelTicketListComponent>,
    public datePipe: DatePipe,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Travel[]) {}

  onClick(ticket: Travel) {
    this.dialog.open(TravelTicketDetailComponent, {
      width: '300px',
      data: ticket
    });
  }
}
