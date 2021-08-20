import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Travel} from "../../../api/booking/models/travel";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-travel-ticket-detail',
  templateUrl: './travel-ticket-detail.component.html',
  styleUrls: ['./travel-ticket-detail.component.scss']
})
export class TravelTicketDetailComponent implements OnInit {

  transportation: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<TravelTicketDetailComponent>,
    public datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: Travel) {}

  ngOnInit(): void {
    this.transportation = this.data.transport!.includes('Omnibus') ? 'Ómnibus' : (this.data.transport!.includes('Ferro') ? 'Tren' : 'Catamarán');
  }

  onRefund() {

  }
}
