import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DatePipe} from '@angular/common';
import {BusCardComponent} from '../bus-card/bus-card.component';
import {LoginRequestComponent} from '../../../shared/ui/login-request/login-request.component';

import {ResService} from '../../../api/booking/services/res.service';
import {Availability} from "../../../api/availability/models/availability";
import {TimerService} from "../../../shared/services/timer.service";
import {NavigationStatusService} from "../../../shared/services/navigation-status.service";
import {ConfirmDialogComponent} from "../../../shared/ui/confirm-dialog/confirm-dialog.component";
import {BusComponent} from "../bus-card/bus/bus.component";



export interface BusInfo {
  travelType: string | undefined;
  id: string | undefined;
  origin: string | undefined;
  destination: string | undefined;
  route: string | undefined;
}

@Component({
  selector: 'app-availability-card',
  templateUrl: './availability-card.component.html',
  styleUrls: ['./availability-card.component.scss']
})

export class AvailabilityCardComponent implements OnInit {

  @Input() item: Availability | undefined;

  selected: boolean | undefined;
  transportation: string | undefined;

  // informacion del tren
  trainNumber: string | undefined;
  carNumber: string | undefined;

  constructor(private dialog: MatDialog,
              private resService: ResService,
              public datePipe: DatePipe,
              private timerService: TimerService,
              private navigationStatusService: NavigationStatusService) {
  }

  ngOnInit(): void {
    this.transportation = this.item!.transport!.includes('Omnibus') ?
      'Ómnibus' : (this.item!.transport!.includes('Ferro') ? 'Tren' : 'Catamarán');

    if (this.transportation === 'Tren') {
      // obtener informacion del tren
      this.getTrainInfo(this.item?.transport!);
    }
  }

  beforeChecking(): void {
    const travelDate = this.datePipe.transform(this.item!.date!.replace(" ", "T"), 'yyyy-MM-dd');
    const noSuggest = localStorage.getItem('noSuggestAlert');
    const text = 'Está a punto de seleccionar un viaje sugerido. La fecha del viaje sugerido es distinta a la deseada. ¿Desea continuar? ';
    if (
      !noSuggest && (
      (this.item!.travelType === 'Ida' && travelDate !== this.navigationStatusService.departureDate) ||
      (this.item!.travelType === 'Regreso' && travelDate !== this.navigationStatusService.comebackDate))
    ) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: 'Sugerencia',
          content: text,
          cancelText: 'cancelar',
          acceptText: 'continuar',
          showAgain: true,
          tag: 'noSuggestAlert',
        }
      });
      dialogRef.afterClosed().subscribe(resp => {
        if (resp) {
          this.checkBus(this.item!);
        }
      });
    } else {
      this.checkBus(this.item!);
    }
  }

  // comprueba que haya disponibilidad paara las fechas seleccionadas por el usuario
  private checkBus(item: Availability): void {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    if (currentUser) {
      this.resService.tickets({userId: currentUser.id}).subscribe(resp => {
        // guardar cantidad de tickets disponibles que tiene el usuario en el dia
        this.navigationStatusService.ticketsLeft = resp.quantity;

        if (this.navigationStatusService.travelType === 'ida-regreso' && this.navigationStatusService.comNoResult) {
          const text = 'No hay disponibilidad para una de las fechas deseadas, ' +
            'por lo que no podrá realizar su reservación. Por favor, seleccione otras fechas';

          this.dialog.open(ConfirmDialogComponent, {
            width: '500px',
            data: {
              title: 'Sin disponibilidad',
              content: text,
              acceptText: 'Ok',
            }
          });
        } else {
          let data: BusInfo;
          if (item.travelType === 'Ida') {
            data = {
              travelType: 'ida',
              id: item.travelId,
              origin: this.navigationStatusService.originCode,
              destination: this.navigationStatusService.destinationCode,
              route: item.denomination
            };

            this.resService.unblockSeats({userId: currentUser.id}).subscribe(() => {
              this.openBus(item, data);
            });
          } else {
            data = {
              travelType: 'vuelta',
              id: item.travelId,
              origin: this.navigationStatusService.destinationCode,
              destination: this.navigationStatusService.originCode,
              route: item.denomination
            };
            this.openBus(item, data);
          }
        }
      });
    } else {
      this.dialog.open(LoginRequestComponent, {
        width: '400px'
      });
    }
  }

  private openBus(item: Availability, data: BusInfo): void {
    const dialogRef = this.dialog.open(BusCardComponent, {
      data
    });
    dialogRef.afterClosed().subscribe((result: BusComponent) => {
      if (result) { // si el usuario presiono cancelar
        if (this.timerService.isTimerRunning() &&
          !this.navigationStatusService.getDepBus() &&
          !this.navigationStatusService.getCbBus()) {
          this.timerService.stopTimer();
        }

        if (result.busService.getSelected().getValue().size !== 0) {
          result.clearSeats();
        }

      } else {
        if (item.travelType === 'Ida') {
          this.navigationStatusService.depTravel = item;
        } else {
          this.navigationStatusService.cbTravel = item;
        }

        this.selected = true;
      }
    });
  }

  private getTrainInfo(transportation: string): void {
    const er = /FerroT*(\d+)_C*(\d+).*/;
    const match = transportation.match(er);
    if (match) {
      this.trainNumber = match[1];
      this.carNumber = match[2];
    }
  }
}
