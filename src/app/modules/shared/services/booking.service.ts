import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {io, Socket} from "socket.io-client";
import {DefaultEventsMap} from "socket.io-client/build/typed-events";
import {Client} from "../../api/booking/models/client";
import {ResService} from "../../api/booking/services/res.service";
import {AddClient} from "../../api/booking/models/add-client";
import {BusSeat} from "../models/bus-seat";
import {PaymentService} from "../../api/payment/services/payment.service";
import {Order} from "../../api/payment/models/order";
import {MatDialog} from "@angular/material/dialog";
import {Qrdata} from "../models/qrdata";
import {QrDialogComponent} from "../ui/qr-dialog/qr-dialog.component";
import {ConfirmDialogComponent} from "../ui/confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private router: Router,
              private resService: ResService,
              private paymentService: PaymentService,
              private dialog: MatDialog,) { }

  private socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
  private orderSubject = new  BehaviorSubject<any>(null);
  private wsSubs: Subscription | undefined;

  private getMessages(orderId: string): Observable<any> {
    if ( this.socket != null ) {
      this.socket.disconnect();
    }
    this.socket = io('https://r03.transnet.cu:443');
    return  new Observable(() => {
      const accessToken = JSON.parse(sessionStorage.getItem('user_id')!);
      this.socket!.on('connect', () => {
        this.socket!.emit('authentication', { access_token: accessToken.idToken} );
      });

      this.socket!.on('authenticated', () => {
        this.socket!.emit('join', orderId);
      });

      this.socket!.on('msg', data => {
        this.orderSubject.next(data);
      });

      this.socket!.on('disconnect', () => {
        this.orderSubject.next('disconnected');
      });
    });
  }

  // Obtiene los mensajes del WS de pago
  getOrderState( travelId: string): Observable<any> {

    this.wsSubs = this.getMessages(travelId).subscribe(data => {
      this.orderSubject.next(data);
    });
    return this.orderSubject;
  }

  unsubscribeWs() {
    this.wsSubs?.unsubscribe();
    this.socket?.disconnect();
    this.socket = undefined;
    this.orderSubject = new  BehaviorSubject<any>(null);
  }

  // inserta los clientes en el sistema
  createClients(clients: Array<Client>): Observable<AddClient[]> {
    return this.resService.insertClients({body: {clients}});
  }

  // inserta la orden de pago en el sistema
  createPaymentOrder(
    date: string,
    userId: string,
    userFullName: string,
    email: string,
    depClients: Array<AddClient> | AddClient,
    comClients: Array<AddClient> | AddClient,
    origin: string,
    destination: string,
    depSeats: Array<BusSeat>,
    comSeats: Array<BusSeat>,
    depId: string,
    comId: string): Observable<Order> {

    const tickets = [];
    for (let i = 0 ; i < depSeats.length; i++) {
      const okDate = depSeats[i].blockTime;
      tickets.push(
        {
          clientId: (depClients instanceof Array) ? depClients[i].id : depClients.id,
          travelId: depId,
          date: okDate,
          seat: depSeats[i].seatNumber.toString(),
          source: origin,
          target: destination,
        }
      );
    }

    for (let i = 0 ; i < comSeats.length; i++) {
      const okDate = depSeats[i].blockTime;
      tickets.push(
        {
          clientId: (comClients instanceof Array) ? comClients[i].id : comClients.id,
          travelId: comId,
          seat: comSeats[i].seatNumber.toString(),
          date: okDate,
          source: destination,
          target: origin
        }
      );
    }

    return this.paymentService.ordersPost({body: {
        email,
        name: userFullName,
        tickets,
        userId,
        appId: 1
      }});
  }

  // obtiene la orden de pago dado su id
  getPaymentOrder(id: string): Observable<Order> {
    return this.paymentService.ordersGet({id});
  }

  // abre un dialogo con el codigo qr del pago
  openQrDialog(id: string, amount: string): void {
    const data: Qrdata = {
      id,
      amount
    };
    const dialogRef = this.dialog.open(QrDialogComponent, {
      disableClose: true,
      data
    });

    dialogRef.backdropClick().subscribe(() => {
      this.paymentService.ordersGet({id}).subscribe(order => {
        if (order.state !== 4) {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '500px',
            data: {
              title: 'Pago incompleto',
              content: 'Aún no ha realizado el pago. ¿Está seguro de que desea salir?',
              cancelText: 'no',
              acceptText: 'si',
            }
          });
          dialogRef.afterClosed().subscribe(resp => {
            if (resp) {
              this.dialog.closeAll();
              this.router.navigate(['/']);
            }
          });
        }
      });
    });
  }
}
