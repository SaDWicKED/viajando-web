import {Component, OnDestroy, OnInit} from '@angular/core';
import {BusSeat} from "../../shared/models/bus-seat";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AddClient} from "../../api/booking/models/add-client";
import {HeaderService} from "../../shared/ui/header/header.service";
import {NavigationStatusService} from "../../shared/services/navigation-status.service";
import {CustomValidators} from "../../shared/tools/custom-validators";
import {TimerService} from "../../shared/services/timer.service";
import {SpinnerOverlayService} from "../../shared/services/spinner-overlay.service";
import {Client} from "../../api/booking/models/client";
import {BookingService} from "../../shared/services/booking.service";
import {ConfirmDialogComponent} from "../../shared/ui/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {TicketDetailComponent} from "./ticket-detail/ticket-detail.component";
import {User} from "../../api/auth/models/user";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CanComponenDeactivate} from "../../core/guards/can-deactivate-guard.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss']
})
export class BookingPage implements OnInit, OnDestroy, CanComponenDeactivate {

  // fechas de viajes de ida y de regreso
  departureDate: string | undefined;
  comebackDate: string | undefined;

  // rutas de ida y de regreso
  depRoute: string | undefined;
  cbRoute: string | undefined;

  // tipo de transporte de ida y de regreso
  depTransportation: string | undefined;
  cbTransportation: string | undefined;

  // asientos de ida y de regreso
  depSeats: Array<BusSeat> | undefined;
  cbSeats: Array<BusSeat> | undefined;

  // formularios de ida y de regreso
  depForm: FormGroup | undefined;
  cbForm: FormGroup | undefined;

  // clientes de idaa y de regreso
  depClients: Array<Client> = [];
  cbClients: Array<Client> = [];

  // respuestas del server al crear los clientes de ida y de regreso
  createdDepClients: Array<AddClient> | undefined;
  createdCbClients: Array<AddClient> | undefined;

  // flags
  booked = false;
  processingBooking: boolean | undefined;
  processingPayment: boolean | undefined;
  private retryCount: number;

  bookingSubscription: Subscription | undefined;

  constructor( private headerService: HeaderService,
               private navigationStatusService: NavigationStatusService,
               private formBuilder: FormBuilder,
               private timerService: TimerService,
               private spinnerService: SpinnerOverlayService,
               private bookingService: BookingService,
               private dialog: MatDialog,
               private router: Router) {
    headerService.setTitle('Reserva');

    this.retryCount = 0;
    this.depSeats = new Array<BusSeat>();
    this.cbSeats = new Array<BusSeat>();

  }

  ngOnInit(): void {
    // reiniciar flag de navegacion
    this.navigationStatusService.setToBookingFromAvailabilityResult(false);

    // cargar la informacion del viaje
    this.departureDate = this.navigationStatusService.departureDate;
    this.comebackDate = this.navigationStatusService.comebackDate;
    this.depRoute = this.navigationStatusService.depTravel?.denomination;
    this.cbRoute = this.navigationStatusService.cbTravel?.denomination;

    const depTransport = this.navigationStatusService.depTravel?.transport;
    const cbTransport = this.navigationStatusService.cbTravel?.transport;

    this.depTransportation = depTransport?.includes('Omnibus') ?
      'Ómnibus' : (depTransport?.includes('Ferro') ? 'Tren' : 'Catamarán');
    this.cbTransportation = cbTransport?.includes('Omnibus') ?
      'Ómnibus' : (cbTransport?.includes('Ferro') ? 'Tren' : 'Catamarán');

    // crear controladores de formularios
    this.depForm = this.formBuilder.group({
      tickets: new FormArray([])
    });
    this.cbForm = this.formBuilder.group({
      tickets: new FormArray([])
    });

    // asientos seleccionados en el viaje de ida
    const depSeats = this.navigationStatusService.getDepSeats();

    // popular formulario de ida
    this. populateForm(depSeats!, this.depSeats!, this.depTickets);

    // asientos seleccionados en el viaje de ida
    const cbSeats = this.navigationStatusService.getCbSeats();

    // popular formulario de regreso
    this. populateForm(cbSeats!, this.cbSeats!, this.cbTickets);

  }

  ngOnDestroy(): void {
    this.timerService.stopTimer();
    this.bookingService.unsubscribeWs();
    this.spinnerService.hide();
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onConfirmBooking(): void {
    const accessToken = sessionStorage.getItem('token');
    if (!accessToken) {
      sessionStorage.setItem('token', 'empty');
    }
    if (this.areThereMinorsAlone()) {
      this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: 'Verifique los datos',
          content: 'Pasajeros menores de edad no pueden viajar solos',
          acceptText: 'revisar',
        }
      });
    } else if (this.areThereDuplicatedIDs()) {
      this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: 'Verifique los datos',
          content: 'No pueden existir pasajeros con el mismo CI en un mismo viaje',
          acceptText: 'revisar',
        }
      });
    } else if (!this.areAllCbTravelersInDep()) {
      this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: 'Verifique los datos',
          content: 'Todos los pasajeros en el viaje de vuelta deben estar en el viaje de ida',
          acceptText: 'revisar',
        }
      });
    } else {
      this.processingBooking = true;
      this.confirmBooking();
    }
  }

  private confirmBooking(): void {
    // popular clientes
    for (const ticket of this.depForm!.value.tickets) {
      this.depClients.push({dni: ticket.ci, name: ticket.fullName});
    }

    // crear clientes
    this.bookingService.createClients(this.depClients).subscribe(
      resultDep => {
        console.log(resultDep);
        this.createdDepClients = resultDep;
        if (this.cbSeats!.length !== 0) {
          for (const ticket of this.cbForm!.value.tickets) {
            this.cbClients.push({dni: ticket.ci, name: ticket.fullName});
          }
          this.bookingService.createClients(this.cbClients).subscribe(
            resultCb => {
              this.createdCbClients = resultCb;
              this.booking();
            });
        } else {
          this.processingBooking = false;
          this.booking();
        }
      }, () => {
        this.processingBooking = false;
      });
  }

  private booking(): void {
    const dialogRef = this.dialog.open(TicketDetailComponent, {
      data: {
        departureRoute: this.navigationStatusService.depTravel?.denomination,
        comebackRoute: this.navigationStatusService.cbTravel?.denomination,
        departureDate: this.navigationStatusService.depTravel?.date,
        comebackDate: this.navigationStatusService.cbTravel?.date,
        departurePrice: this.navigationStatusService.depTravel?.price,
        comebackPrice: this.navigationStatusService.cbTravel ? this.navigationStatusService.cbTravel.price : 0,
        departurePassengers: this.depClients,
        comebackPassengers: this.cbClients,
        departureSeats: this.depSeats,
        comebackSeats: this.cbSeats
      }
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        const text = `Se guardará toda la información de los pasajeros.
                    Estos datos no podrán ser modificados posteriormente
                    ¿Está seguro de que desea continuar?`;

        const dialogRef2 = this.dialog.open(ConfirmDialogComponent, {
          width: '500px',
          data: {
            title: 'Verifique los datos',
            content: text,
            cancelText: 'revisar',
            acceptText: 'continuar',
          }
        });

        dialogRef2.afterClosed().subscribe(res => {
          if (res) {
            const currentUser: User = JSON.parse(sessionStorage.getItem('currentUser')!);
              const date = new Date().toISOString();
              const userid = currentUser.id;
              const userFullName = currentUser.firstName + ' ' + currentUser.lastName;

              const email = currentUser.email;
              this.bookingService.createPaymentOrder(
                date,
                userid!,
                userFullName,
                email!,
                this.createdDepClients!,
                this.createdCbClients!,
                this.navigationStatusService.originCode!,
                this.navigationStatusService.destinationCode!,
                Array.from(this.depSeats!),
                Array.from(this.cbSeats!),
                this.navigationStatusService.depTravel?.travelId!,
                this.navigationStatusService.cbTravel?.travelId!).subscribe(
                resp => {
                  console.log(resp);
                  this.checkPaymentWS(resp.id!);
                },
                error => {
                  console.log(error);
                }
              );

          } else {
            this.depClients = [];
            this.cbClients = [];
          }
        });
      } else {
        this.depClients = [];
        this.cbClients = [];
      }
    });

  }

  // checkea el estado del pago via WS
  private checkPaymentWS(orderId: string): void {
    if (!this.processingPayment) {
      this.processingPayment = true;
      this.spinnerService.show('Procesando pago, por favor espere');
    }

    this.bookingSubscription?.unsubscribe();

    this.bookingSubscription = this.bookingService.getOrderState(orderId).subscribe(order => {
      console.log(order);
      if (order) {
        if (order.state === 3) { // si tranfermovil acepto la orden
          this.booked = true;
          this.spinnerService.hide();
          this.openQrDialog(order.extenalId!.toString(), order.amount.toString());
        } else if (order.state === 4) { // pago completado
          this.bookingService.unsubscribeWs();
          this.dialog.closeAll();
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            width: '500px',
            data: {
              title: 'Pago satisfactorio',
              content: 'Su pago ha sido completado. Gracias por usar nuestros servicios',
              acceptText: 'continuar',
            }
          });
          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/']);
          });
        } else if (order.state === 5) { // ocurrio un error
          this.processingPayment = false;
          this.spinnerService.hide();
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '500px',
            data: {
              title: 'Ha ocurrido un error',
              content: order.msg,
              acceptText: 'salir',
            }
          });
          dialogRef.afterClosed().subscribe(() => {
            location.reload();
          });
        } else if (order === 'disconnected' && !this.booked) {
          this.spinnerService.hide();
          this.bookingService.unsubscribeWs();
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            width: '500px',
            data: {
              title: 'Error de conexión',
              content: 'Se ha interrumpido la comunicación con el servidor. ¿Desea reintentarlo?',
              cancelText: 'cancelar',
              acceptText: 'reintentar',
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.processingPayment = false;
              this.checkPayment(orderId);
            } else {
              location.reload();
            }
          });
        }
      }
    });
  }

  // checkea el estado del pago manualmente
  private checkPayment(orderId: string): void {
    if (!this.processingPayment) {
      this.processingPayment = true;
      this.spinnerService.show('Procesando pago, por favor espere');
    }

    this.bookingService.getPaymentOrder(orderId).subscribe(order => {
      console.log(order);
      if (order.state === 3) { // si tranfermovil acepto la orden
        this.booked = true;
        this.spinnerService.hide();
        this.openQrDialog(order.externalId!.toString(), order.amount!.toString());
      } else if (order.state === 4) { // pago completado
        this.bookingService.unsubscribeWs();
        this.dialog.closeAll();
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          disableClose: true,
          width: '500px',
          data: {
            title: 'Pago satisfactorio',
            content: 'Su pago ha sido completado. Gracias por usar nuestros servicios',
            acceptText: 'continuar',
          }
        });
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/']);
        });
        console.log('pago completado');
      } else if (order.state === 2) { // si la orden esta pendiente por transfermovil
        if (this.retryCount < 5) {
          this.retryCount += 1;
          setTimeout(() => {
            this.processingPayment = false;
            this.checkPayment(orderId);
          }, 5000);
        } else {
          this.retryCount = 0;
          this.processingPayment = false;
          this.spinnerService.hide();
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            width: '500px',
            data: {
              title: 'Orden pendiente',
              content: 'Su orden de pago aún no ha sido procesada por la plataforma',
              cancelText: 'cancelar',
              acceptText: 'reintentar'
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.processingPayment = false;
              this.spinnerService.hide();
              this.checkPayment(orderId);
            } else {
              location.reload();
            }
          });
        }
      } else if (order.state === 1) {
        if (this.retryCount < 5) {
          this.retryCount += 1;
          setTimeout(() => {
            this.processingPayment = false;
            this.spinnerService.hide();
            this.checkPayment(orderId);
          }, 5000);
        } else {
          this.retryCount = 0;
          this.processingPayment = false;
          this.spinnerService.hide();
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            width: '500px',
            data: {
              title: 'Orden insertada',
              content: 'Su orden de pago ha sido insertada en el sistema, pero aún no ha sido procesada por la plataforma de pago',
              cancelText: 'cancelar',
              acceptText: 'reintentar',
            }
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.processingPayment = false;
              this.spinnerService.hide();
              this.checkPayment(orderId);
            } else {
              location.reload();
            }
          });
        }
      } else if (order.state === 5) {
        this.retryCount = 0;
        this.processingPayment = false;
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '500px',
          data: {
            title: 'Ha ocurrido un error',
            content: order.msg,
            acceptText: 'salir',
          }
        });
        dialogRef.afterClosed().subscribe(() => {
          location.reload();
        });
      }
    }, error => {
      if (error.status === 0 && error.error instanceof ProgressEvent) {
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          disableClose: true,
          width: '500px',
          data: {
            title: 'Error de conexión',
            content: 'Se ha interrumpido la comunicación con el servidor. ¿Desea reintentarlo?',
            cancelText: 'cancelar',
            acceptText: 'reintentar',
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.processingPayment = false;
            this.checkPayment(orderId);
          } else {
            location.reload();
          }
        });
      }
    });
  }

  private openQrDialog(id: string, amount: string): void {
    this.bookingService.openQrDialog(id, amount);
  }

  cancelBooking(): void {
    this.navigationStatusService.getDepBus()?.clearSeats();
    this.navigationStatusService.getCbBus()?.clearSeats();
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser: User = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (!this.booked && currentUser) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        width: '500px',
        data: {
          title: 'Alerta',
          content: 'Si sale de aquí se cancelará la reserva actual. ¿Desea salir?',
          cancelText: 'cancelar',
          acceptText: 'continuar'
        }
      });

      return dialogRef.afterClosed().toPromise().then(result => {
        if (result) {
          this.cancelBooking();
          return true;
        } else {
          return false;
        }
      });
    } else if (!this.booked && !currentUser){
      this.cancelBooking();
    }
    return true;
  }

  ////////////////////////////////////
  //      Auxiliary functions       //
  ////////////////////////////////////

  // convenience getters for easy access to form fields
  get depControls(): {[p: string]: AbstractControl} { return this.depForm!.controls; }
  get cbControls(): {[p: string]: AbstractControl} { return this.cbForm!.controls; }

  get depTickets(): FormArray { return this.depControls.tickets as FormArray; }
  get cbTickets(): FormArray { return this.cbControls.tickets as FormArray; }


  // funcion auxiliar para castear de tipo AbstractControl a FormGroup
  castToFormGroup(abstractControl: AbstractControl): FormGroup {
    return abstractControl as FormGroup;
  }

  // popula un formulario dados los asientos seleccionados por el usuario
  private populateForm(seats: Set<BusSeat>, forPopulating:Array<BusSeat>, formArray: FormArray): void {

    seats?.forEach(seat => {
      forPopulating?.push(seat);
    });

    // departure tickets
    const numberOfDepTickets = this.depSeats?.length || 0;

    // poblar formulario
    for (let i = 0; i < numberOfDepTickets; i++) {
      formArray.push(this.formBuilder.group({
        fullName: ['', [Validators.required, CustomValidators.invalidName]],
        ci: ['', [Validators.required, CustomValidators.invalidID]]
      }));
    }
  }

  // Comprueba que todos los viajeros en el viaje de regreso estan tambien en el viaje de ida
  private areAllCbTravelersInDep(): boolean {
    const depTravelers = this.depForm!.value.tickets;
    const comTravelers = this.cbForm!.value.tickets;

    for (const ticket of comTravelers) {
      if (!depTravelers.find( (item: any) => item.fullName === ticket.fullName && item.ci === ticket.ci)) {
        return false;
      }
    }
    return true;
  }

  // comprueba que no hallan pasajeros con el mismo CI
  private areThereDuplicatedIDs(): boolean {
    const depTravelers = this.depForm!.value.tickets;
    const comTravelers = this.cbForm!.value.tickets;

    const depIDs = new Set(depTravelers.map((v: any) => v.ci));
    const comIDs = new Set(comTravelers.map((v: any) => v.ci));

    return depIDs.size < depTravelers.length || comIDs.size < comTravelers.length;
  }

  // comprueba que no hallan menores de edad viajando solos
  private areThereMinorsAlone(): boolean {
    for (let i = 0 ; i < this.depSeats!.length; i++) {
      if (CustomValidators.getAgeByDNI(this.depForm!.value.tickets[i].ci, this.departureDate?.replace(/-/g, "/")) >= 16) {
        return false;
      }
    }
    return true;
  }
}
