import {Component, Input, OnInit} from '@angular/core';
import {Travel} from "../../../api/booking/models/travel";
import {MatDialog} from "@angular/material/dialog";
import {TravelTicketListComponent} from "../travel-ticket-list/travel-ticket-list.component";

@Component({
  selector: 'app-travel-card',
  templateUrl: './travel-card.component.html',
  styleUrls: ['./travel-card.component.scss']
})
export class TravelCardComponent implements OnInit {

  @Input() travel: Travel | undefined;
  @Input() numberOfSeats: number | undefined;
  @Input() tickets: Travel[] | undefined;

  totalPrice: number | undefined;
  state: string | undefined;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.state = this.travel?.state?.includes('Petición') ? 'peticion' : this.travel?.state;
    this.totalPrice = this.tickets?.reduce((total, travel) => total + Number(travel.price), 0);
  }

  onClick() {
    this.dialog.open(TravelTicketListComponent, {
      width: '450px',
      maxHeight: '90vh',
      data: this.tickets
    });
  }
}
