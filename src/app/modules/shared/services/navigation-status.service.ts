import { Injectable } from '@angular/core';
import {BusComponent} from "../../pages/availability-result/bus-card/bus/bus.component";
import {Subject} from "rxjs";
import {BusSeat} from "../models/bus-seat";
import {Availability} from "../../api/availability/models/availability";

@Injectable({
  providedIn: 'root'
})
export class NavigationStatusService {

  // codigos de las localidades de origen y destino
  originCode: string | undefined;
  destinationCode: string | undefined;

  // fechas de ida y vuelta seleeccionadas por el usuario
  departureDate: string | undefined;
  comebackDate: string | undefined;

  // numero de asientos seleccionados (para chequear el limite por bus: 4)
  numberOfSeatsSelectedDep = 0;
  numberOfSeatsSelectedCb = 0;

  // ida o ida-regreso
  travelType: string | undefined;

  // numero de tickets disponibles en el dia
  ticketsLeft: number | undefined;

  // verdadero si no hay viajes de vuelta en el rango de fechas seleccionado
  comNoResult = true;

  // viaje de ida y de vuelta seleccionados por el usuario
  depTravel: Availability | undefined;
  cbTravel: Availability | undefined;

  // buses de ida y de vuelta seleccionados por el usuario
  private depBus: BusComponent | undefined;
  private cbBus: BusComponent | undefined;

  depSelectedSubject: Subject<BusComponent> = new Subject<BusComponent>();
  cbSelectedSubject: Subject<BusComponent> = new Subject<BusComponent>();

  private toBookingFromAvailabilityResult = false;

  constructor() { }

  getDepBus(): BusComponent | undefined {
    return this.depBus;
  }

  getCbBus(): BusComponent | undefined {
    return this.cbBus;
  }

  setDepBus(bus: BusComponent): void {
    this.depBus = bus;
    this.depSelectedSubject.next(bus);
  }

  setCbBus(bus: BusComponent): void {
    this.cbBus = bus;
    this.cbSelectedSubject.next(bus);
  }

  deleteDepBus(): void {
    this.depBus = undefined;
  }

  deleteCbBus(): void {
    this.cbBus = undefined;
  }

  addDepSeat(): void {
    this.numberOfSeatsSelectedDep += 1;
  }
  removeDepSeat(): void {
    this.numberOfSeatsSelectedDep -= 1;
  }
  addCbSeat() {
    this.numberOfSeatsSelectedCb += 1;
  }
  removeCbSeat() {
    this.numberOfSeatsSelectedCb -= 1;
  }

  getToBookingFromAvailabilityResult(): boolean {
    return this.toBookingFromAvailabilityResult;
  }

  setToBookingFromAvailabilityResult(newStatus: boolean): void {
    this.toBookingFromAvailabilityResult = newStatus;
  }

  getDepSeats(): Set<BusSeat> | undefined {
    return this.depBus?.busService.getSelected().value;
  }

  getCbSeats(): Set<BusSeat> | undefined {
    return this.cbBus?.busService.getSelected().value;
  }

  printStatus(): void {
    console.log('origin code:', this.originCode);
    console.log('destination code:',this.destinationCode);
    console.log('departure code:',this.departureDate);
    console.log('comeback code:',this.comebackDate);
    console.log('number of seats dep:',this.numberOfSeatsSelectedDep);
    console.log('number of seats com:',this.numberOfSeatsSelectedCb);
    console.log('travel type:',this.travelType);
    console.log('tickets left:',this.ticketsLeft);
    console.log('comNoResult:',this.comNoResult);
    console.log('departure bus:',this.depBus);
    console.log('comeback bus:',this.cbBus);
    console.log('toBookingFromAvailabilityResult:',this.toBookingFromAvailabilityResult);
  }
}
