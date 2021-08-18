import {Component, OnDestroy, OnInit} from '@angular/core';
import {RedirectionService} from "../../shared/services/redirection.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Availability} from "../../api/availability/models/availability";
import {HeaderService} from "../../shared/ui/header/header.service";
import {AvailabilityService} from "../../shared/services/availability.service";
import {DatePipe} from "@angular/common";
import {NavigationStatusService} from "../../shared/services/navigation-status.service";
import {ConfirmDialogComponent} from "../../shared/ui/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {TimerService} from "../../shared/services/timer.service";

@Component({
  selector: 'app-availability-result',
  templateUrl: './availability-result.page.html',
  styleUrls: ['./availability-result.page.scss']
})
export class AvailabilityResultPage implements OnInit, OnDestroy {

  travelType: string | undefined; // ida o ida-regreso
  selectedTravelMode: string | undefined; // bus, tren o catamaran

  origin: string | undefined;
  destination: string | undefined;
  depDate: string | undefined;
  cbDate: string | undefined;

  // flag para saber si ya se selecciono el viaje de ida
  depSelected = false;

  // todos los viajes disponibles
  availability: Availability[] | undefined;

  // viajes de ida y regreso disponibles en bus para las fechas seleccionadas
  depBusAvailability: Availability[] | undefined;
  cbBusAvailability: Availability[] | undefined;

  // viajes de ida y regreso disponibles en tren para las fechas seleccionadas
  depTrainAvailability: Availability[] | undefined;
  cbTrainAvailability: Availability[] | undefined;

  // sugerencias de viajes de ida y regreso en bus
  depBusSuggestions: Availability[] | undefined;
  cbBusSuggestions: Availability[] | undefined;

  // sugerencias de viajes de ida y regreso en tren
  depTrainSuggestions: Availability[] | undefined;
  cbTrainSuggestions: Availability[] | undefined;

  // viajes de ida y regreso disponibles en catamaran para las fechas seleccionadas
  depBoatAvailability: Availability[] | undefined;
  cbBoatAvailability: Availability[] | undefined;

  // sugerencias de viajes de ida y regreso en catamaran
  depBoatSuggestions: Availability[] | undefined;
  cbBoatSuggestions: Availability[] | undefined;

  private depSelectedSubscription: Subscription | undefined;
  private cbSelectedSubscription: Subscription | undefined;
  private depBusSubscription: Subscription | undefined;
  private cbBusSubscription: Subscription | undefined;

  constructor(private headerService: HeaderService,
              private redirectionService: RedirectionService,
              private router: Router,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private timerService: TimerService,
              private availabilityService: AvailabilityService,
              private navigationStatusService: NavigationStatusService,
              private datePipe: DatePipe,) {
    headerService.setHeight(65);
    redirectionService.setReturnURL(router.url);
  }

  ngOnInit(): void {
    this.travelType = this.activatedRoute.snapshot.params.travelType;
    this.origin =  this.activatedRoute.snapshot.params.origin;
    this.destination = this.activatedRoute.snapshot.params.destination;
    this.depDate = this.activatedRoute.snapshot.params.departureDate;
    this.cbDate = this.activatedRoute.snapshot.params.comebackDate;

    // actualizar el estado de la navegacion
    this.navigationStatusService.travelType = this.travelType;
    this.navigationStatusService.originCode = this.origin;
    this.navigationStatusService.destinationCode = this.destination;
    this.navigationStatusService.departureDate = this.depDate;
    this.navigationStatusService.comebackDate = this.cbDate;
    this.navigationStatusService.deleteDepBus();
    this.navigationStatusService.deleteCbBus();

    this.depSelectedSubscription = this.navigationStatusService.depSelectedSubject.subscribe(() => {
      if (this.travelType === 'ida') {
        this.confirmDialog();
      } else {
        this.depSelected = true;
      }
    });

    this.cbSelectedSubscription = this.navigationStatusService.cbSelectedSubject.subscribe(() => {
      this.confirmDialog();
    });

    this.activatedRoute.params.subscribe(params => {
      this.travelType = params.travelType;
      this.selectedTravelMode = 'Omnibus';
      this.origin =  params.origin;
      this.destination = params.destination;
      this.depDate = params.departureDate;
      this.cbDate = params.comebackDate;

      this.availabilityService.getAvailability(
        this.travelType!,
        this.selectedTravelMode,
        this.origin!,
        this.destination!,
        this.depDate!,
        this.cbDate!).subscribe(data => {
          this.availability = data;
          this.getAvailability();
        });
    });
  }

  ngOnDestroy(): void {
    this.headerService.setHeight(300);

    this.depBusSubscription?.unsubscribe();
    this.cbBusSubscription?.unsubscribe();
    this.depSelectedSubscription!.unsubscribe();
    this.cbSelectedSubscription!.unsubscribe();

    const depBus = this.navigationStatusService.getDepBus();
    const cbBus = this.navigationStatusService.getCbBus();
    const booked = this.navigationStatusService.getToBookingFromAvailabilityResult();

    if (!booked && this.timerService.isTimerRunning()) {
      this.timerService.stopTimer();
      depBus?.clearSeats();
      cbBus?.clearSeats();
    }
  }

  // separa la disponibilidad en viajes de ida y regreso para bus, tren y catamaran
  private getAvailability(): void {
    const busData = this.availability!.filter(item => item.transport!.includes('Omnibus'));
    const trainData = this.availability!.filter(item => item.transport!.includes('Ferro' ));
    const boatData = this.availability!.filter(item => item.transport!.includes('Cat' ));

    const busFiltered = this.filterAvailability(busData);
    const trainFiltered = this.filterAvailability(trainData);
    const boatFiltered = this.filterAvailability(boatData);

    this.depBusAvailability = busFiltered.depAvailability;
    this.cbBusAvailability = busFiltered.cbAvailability;
    this.depBusSuggestions = busFiltered.depSuggestions;
    this.cbBusSuggestions = busFiltered.cbSuggestions;

    this.depTrainAvailability = trainFiltered.depAvailability;
    this.cbTrainAvailability = trainFiltered.cbAvailability;
    this.depTrainSuggestions = trainFiltered.depSuggestions;
    this.cbTrainSuggestions = trainFiltered.cbSuggestions;

    this.depBoatAvailability = boatFiltered.depAvailability;
    this.cbBoatAvailability = boatFiltered.cbAvailability;
    this.depBoatSuggestions = boatFiltered.depSuggestions;
    this.cbBoatSuggestions = boatFiltered.cbSuggestions;

    this.navigationStatusService.comNoResult =
      this.cbBusAvailability.length === 0 &&
      this.cbTrainAvailability.length === 0 &&
      this.cbBoatAvailability.length === 0 &&
      this.cbBoatSuggestions.length === 0 &&
      this.cbBusSuggestions.length === 0 &&
      this.cbTrainSuggestions.length === 0;
  }

  // Devuelve la disponibilidad de un tipo de transporte
  // separada segun el tipo de viaje (ida, regreso, sugeridp de ida o sugerido de regreso)
  private filterAvailability(data: Availability[]) {
    const depAvailability = data.filter(
      item => item.capacity !== null && (this.datePipe.transform(item.date, 'yyyy-MM-dd') === this.depDate ) &&
        (item.travelType === 'Ida'));

    const cbAvailability = data.filter(
      item => item.capacity !== null && (this.datePipe.transform(item.date, 'yyyy-MM-dd') === this.cbDate) &&
        (item.travelType === 'Regreso'));

    const depSuggestions = data.filter(
      item => item.capacity !== null && (this.datePipe.transform(item.date, 'yyyy-MM-dd') !== this.depDate &&
        (item.travelType === 'Ida')));

    const cbSuggestions = data.filter(
      item => item.capacity !== null && (this.datePipe.transform(item.date, 'yyyy-MM-dd') !== this.cbDate &&
        (item.travelType === 'Regreso')));

    return {depAvailability, cbAvailability, depSuggestions, cbSuggestions};
  }

  onTravelMode(transp: string): void {
    this.selectedTravelMode = transp;
  }

  private confirmDialog(): void {
    const msg = `Se dispone a reservar los asientos seleccionados.
    ¿Desea continuar?`;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '500px',
      data: {
        title: 'Reservar',
        content: msg,
        cancelText: 'Cancelar',
        acceptText: 'Continuar',
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.goToBooking();
      } else {
        this.reloadCurrentRoute();
      }
    });
  }

  private goToBooking(): void {
    this.navigationStatusService.setToBookingFromAvailabilityResult(true);
    this.router.navigate(['/booking']);
  }

  private reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
