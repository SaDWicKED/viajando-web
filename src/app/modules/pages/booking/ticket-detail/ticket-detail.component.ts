import {Component, Inject, OnInit} from '@angular/core';
import {BusSeat} from "../../../shared/models/bus-seat";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../ui/confirm-dialog/confirm-dialog.component";
import {CustomValidators} from "../../../shared/tools/custom-validators";

export interface Passenger {
  name: string;
  dni: string;
}

export interface TicketData {
  departureRoute: string;
  comebackRoute: string;
  departureDate: string;
  comebackDate: string;
  departurePrice: number;
  comebackPrice: number;
  departurePassengers: Passenger[];
  comebackPassengers: Passenger[];
  departureSeats: BusSeat[];
  comebackSeats: BusSeat[];
}

export interface ExtendedClient {
  name: string;
  dni: string;
  depSeat: number;
  comSeat: number | null;
}

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  passengers: ExtendedClient[] | undefined;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TicketData) { }

  ngOnInit(): void {
    this.passengers = this.allPassengers();
  }

  calculateTicketPrice(): number {
    let price = 0;
    for (const passenger of this.passengers!) {
      if (CustomValidators.getAgeByDNI(passenger.dni, this.data.departureDate) >= 16) {
        price += this.data.departurePrice;
        if (passenger.comSeat) {
          price += this.data.comebackPrice;
        }
      } else {
        price += this.data.departurePrice / 2;
        if (passenger.comSeat) {
          price += this.data.comebackPrice / 2;
        }
      }
    }
    return price;
  }

  // retorna un listado con todos los pasajeros y sus repectivos asientos
  allPassengers(): ExtendedClient[] {
    const clients: ExtendedClient[] = [];

    // si el viaje es ida y vuelta
    if (this.data.comebackPassengers.length) {
      for (let i = 0 ; i < this.data.departurePassengers.length; i++) {
        const indexCb = this.data.comebackPassengers.findIndex(pass => this.data.departurePassengers[i].dni === pass.dni);
        console.log(indexCb);
        if (indexCb !== -1) { // si el pasajero tiene ticket de ida y de vuelta
          clients.push({
            name: this.data.departurePassengers[i].name,
            dni: this.data.departurePassengers[i].dni,
            depSeat: this.data.departureSeats[i].seatNumber,
            comSeat: this.data.comebackSeats[indexCb].seatNumber
          });
        } else { // si solo tiene ida
          clients.push({
            name: this.data.departurePassengers[i].name,
            dni: this.data.departurePassengers[i].dni,
            depSeat: this.data.departureSeats[i].seatNumber,
            comSeat: null
          });
        }
      }
    } else { // si el viaje es solo de ida
      for (let i = 0 ; i < this.data.departurePassengers.length; i++) {
        clients.push({
          name: this.data.departurePassengers[i].name,
          dni: this.data.departurePassengers[i].dni,
          depSeat: this.data.departureSeats[i].seatNumber,
          comSeat: null
        });
      }
    }
    return clients;

  }
}
