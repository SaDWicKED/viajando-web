import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BusSeat} from "../../../../shared/models/bus-seat";
import {BusService} from "./bus.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TimerService} from "../../../../shared/services/timer.service";
import {ConfirmDialogComponent} from "../../../../shared/ui/confirm-dialog/confirm-dialog.component";
import {User} from "../../../../api/auth/models/user";

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss'],
  providers: [BusService]
})
export class BusComponent implements OnInit, OnDestroy {

  @Input() id: string | undefined;
  @Input() origin: string | undefined;
  @Input() dest: string | undefined;
  @Input() travelType: string | undefined;

  seats: BusSeat[][] | undefined;

  // usuario logueado cuando se crea el bus
  private currentUser: User;

  private numberOfClicks: number | undefined;

  constructor(public busService: BusService,
              private router: Router,
              private dialog: MatDialog,
              private timerService: TimerService,) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
  }

  ngOnInit(): void {
    this.numberOfClicks = 0;

    this.busService.getPlano(this.id!, this.origin!, this.dest!).subscribe(seatMap => {
      this.seats = seatMap;
      this.busService.getBusState(this.id!).subscribe(seats => {
        this.seats = seats;
      });
    });
  }

  ngOnDestroy(): void {
    this.busService.unsubscribeWs();
  }

  // deselecciona todos los asientos
  clearSeats(): void {
    console.log('seats cleared!!');
    this.busService.unlockAll(this.currentUser.id!).subscribe(() => {});
  }

  seatClicked($event: [BusSeat, string]): void {
    this.numberOfClicks! += 1;

    if (this.numberOfClicks === 1 && !this.timerService.isTimerRunning()) {
      this.childrenAlert();
      this.timerService.startTimer();
    }

    if ($event[1] === 's') {
      this.busService.setSelected($event[0], this.id!, this.origin!, this.dest!).subscribe(() => {
        $event[0].seatState = 1;
      });
    } else {
      this.busService.removeSelected($event[0], this.id!, $event[0].getBlockTime()!).subscribe(() => {
        $event[0].seatState = 0;
      });
    }
  }

  private childrenAlert(): void {
    const noChildrenAlert = localStorage.getItem('noChildrenAlert');

    if (!noChildrenAlert) {
      const text = 'Si viaja con un menor de edad debe comprar su boleto en la misma operación en que compre la de un adulto';

      this.dialog.open(ConfirmDialogComponent, {
        width: '500px',
        data: {
          title: 'Menor de edad',
          content: text,
          acceptText: 'continuar',
          showAgain: true,
          tag: 'noChildrenAlert',
        }
      });
    }
  }
}
