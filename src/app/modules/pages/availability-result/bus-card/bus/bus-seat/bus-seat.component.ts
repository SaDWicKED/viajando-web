import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {BusSeat} from "../../../../../shared/models/bus-seat";
import {Subscription} from "rxjs";
import {BusService} from "../../../bus.service";
import {MatDialog} from "@angular/material/dialog";
import {NavigationStatusService} from "../../../../../shared/services/navigation-status.service";
import {ConfirmDialogComponent} from "../../../../../shared/ui/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-bus-seat',
  templateUrl: './bus-seat.component.html',
  styleUrls: ['./bus-seat.component.scss']
})
export class BusSeatComponent implements OnInit, OnDestroy {

  @Input() seat: BusSeat | undefined;
  @Input() travelType: string | undefined;
  @Output() check = new EventEmitter<[BusSeat, string]>();
  numSelected: number | undefined;

  selectedSubscription: Subscription | undefined;

  constructor(private busService: BusService,
              private dialog: MatDialog,
              private navigationStatusService: NavigationStatusService) { }

  ngOnInit(): void {
    this.selectedSubscription = this.busService.getSelected().subscribe(selected => {
      this.numSelected = selected.size;
    });
  }

  ngOnDestroy(): void {
    this.selectedSubscription!.unsubscribe();
  }

  onClick(): void {
    const noDepSeats = this.navigationStatusService.numberOfSeatsSelectedDep; // number of departure seats selected
    const noCbSeats = this.navigationStatusService.numberOfSeatsSelectedCb; // number of comeback seats selected
    const numberOfTicketsLeft = this.navigationStatusService.ticketsLeft; // number of tickets left

    if (this.seat!.seatState === 0 && this.numSelected! < 4) {
      if (noDepSeats + noCbSeats === numberOfTicketsLeft) {
        this.dialog.open(ConfirmDialogComponent, {
          disableClose: true,
          width: '500px',
          data: {
            title: 'Información',
            content: 'Solo puede realizar 8 reservas diarias, si desea realizar más vuelva mañana',
            acceptText: 'Entendido',
          }
        });
      } else {
        // this.seat.seatState = 1;
        if (this.travelType === 'ida') {
          this.navigationStatusService.addDepSeat();
        } else {
          if (noDepSeats !== 0 && noCbSeats === noDepSeats) {
            this.dialog.open(ConfirmDialogComponent, {
              disableClose: true,
              width: '500px',
              data: {
                title: 'Información',
                content: 'No se pueden reservar más pasajes de vuelta que de ida',
                acceptText: 'Entendido',
              }
            });
            return;
          }
          this.navigationStatusService.addCbSeat();
        }
        this.check.emit([this.seat!, 's']);
      }

    }  else if (this.seat!.seatState === 1) {
      // this.seat.seatState = 0;
      if (this.travelType === 'ida') {
        this.navigationStatusService.removeDepSeat();
      } else {
        this.navigationStatusService.removeCbSeat();
      }
      this.check.emit([this.seat!, 'd']);
    }
  }
}
