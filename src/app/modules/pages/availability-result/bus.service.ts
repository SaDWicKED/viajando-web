import { Injectable } from '@angular/core';
import {BusSeat} from "../../shared/models/bus-seat";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {io, Socket} from "socket.io-client";
import {ResService} from "../../api/booking/services/res.service";
import {map} from "rxjs/operators";
import {BlockSeat} from "../../api/booking/models/block-seat";
import {UnBlockSeat} from "../../api/booking/models/un-block-seat";
import {Seat} from "../../api/booking/models/seat";

@Injectable()
export class BusService {

  private numbers: Array<BusSeat[]>;
  private numberSubject: BehaviorSubject<Array<BusSeat[]>>;
  private readonly selected: Set<BusSeat>;
  private readonly selectedSubject: BehaviorSubject<Set<BusSeat>>;

  constructor(private resService: ResService) {
    this.numbers = new Array<BusSeat[]>();
    this.numberSubject = new  BehaviorSubject<Array<BusSeat[]>>(this.numbers);
    this.selected = new Set<BusSeat>();
    this.selectedSubject = new BehaviorSubject<Set<BusSeat>>(this.selected);
  }

  private socket: Socket | undefined;
  private wsSubs: Subscription | undefined;

  private getMessages(travelId: string) {
    if ( this.socket != null ) {
      this.socket.disconnect();
    }
    this.socket = io('https://r03.transnet.cu:443');
    return  new Observable(() => {
      const accessToken = JSON.parse(sessionStorage.getItem('user_id')!);
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);

      this.socket!.on('connect', () => {
        this.socket!.emit('authentication', { access_token: accessToken.idToken} );
      });

      this.socket!.on('authenticated', () => {
        this.socket!.emit('join', travelId);
      });

      this.socket!.on('msg', (data: any) => {
        if (data.userId !== currentUser.id) {
          const seat = parseInt(data.seats, 10);
          const state = data.free;
          this.numbers.forEach(row => {
            row.forEach(item => {
              if (item.seatNumber === seat) {
                item.seatState = (state === 0) ? 3 : 0;
              }
            });
          });

          this.numberSubject.next(this.numbers);
        }
      });
    });
  }

  // obtiene los cambios de estado de los asientos via websocket
  getBusState( travelId: string): Observable<Array<BusSeat[]>> {
    this.wsSubs = this.getMessages(travelId).subscribe(data => {
      this.numberSubject.next(data as Array<BusSeat[]>);
    });
    return this.numberSubject;
  }

  unsubscribeWs() {
    this.wsSubs!.unsubscribe();
    this.socket!.disconnect();
  }

  // seleciona un asiento
  setSelected(seat: BusSeat, idViaje: string, origin: string, dest: string): Observable<BlockSeat> {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    return this.resService.blockSeat({body: {
        seats: seat.seatNumber.toString(),
        source: origin,
        target: dest,
        travelId: idViaje,
        userId: currentUser.id
      }
    }).pipe(
      map(res => {
        this.selected.add(seat);
        this.selectedSubject.next(this.selected);
        this.numbers.forEach(row => {
          row.forEach(item => {
            if (item.seatNumber === seat.seatNumber) {
              item.setBlockTime(res.date!);
            }
          });
        });
        this.numberSubject.next(this.numbers);
        return res;
      })
    );
  }

  // deselecciona un asiento
  removeSelected(seat: BusSeat, idViaje: string, blockTime: string): Observable<UnBlockSeat> {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    this.selected.forEach(e => {
      if (e.seatNumber === seat.seatNumber) {
        this.selected.delete(e);
      }
    });

    this.selectedSubject.next(this.selected);

    return this.resService.unblockSeat( {body: {
        date: blockTime,
        seats: seat.seatNumber.toString(),
        travelId: idViaje,
        userId: currentUser.id}});
  }

  // devuelve los asientos seleccionados
  getSelected(): BehaviorSubject<Set<BusSeat>> {
    return this.selectedSubject;
  }

  // obtiene el plano de los asientos de un bus
  getPlano(travelId: string, origin: string, dest: string): BehaviorSubject<BusSeat[][]> {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    const numbers2 = new Array<BusSeat[]>();

    this.resService.seatMaps({
      travelId,
      source: origin,
      target: dest,
      userId: currentUser.id
    }).pipe(
      map(seats => {
        const transport = [...Array(seats.length).keys()].map(i => i + 1);

        const middleRowLength = 4;
        const lastRowLength = transport.length % 2 !== 0 ? 5 : middleRowLength;
        const firstRowLegth = ((transport.length - lastRowLength) / 2) % 2 !== 0 ? 2 : middleRowLength;

        // first row
        let tmp = new Array<BusSeat>();
        for (let i = 0; i < firstRowLegth; i++) {
          tmp.push(this.setSeat(seats, transport, i));
        }
        numbers2.push(tmp)

        // middle rows
        for (let i = firstRowLegth; i < transport.length - lastRowLength; i += middleRowLength) {
          tmp = new Array<BusSeat>();
          for (let j = i; j < i + middleRowLength; j++) {
            tmp.push(this.setSeat(seats, transport, j));
          }
          numbers2.push(tmp);
        }

        // last row
        tmp = new Array<BusSeat>();
        for (let i = transport.length - lastRowLength; i < transport.length; i++) {
          tmp.push(this.setSeat(seats, transport, i));
        }
        numbers2.push(tmp);
      })
    ).subscribe();
    this.numbers = numbers2;
    this.numberSubject = new BehaviorSubject<Array<BusSeat[]>>(numbers2);
    this.numberSubject.next(numbers2);
    return this.numberSubject;
  }

  // desbloquea todos los asientos que un usuario trenga seleccionados en el server
  unlockAll(userId: string) {
    return this.resService.unblockSeats({userId});
  }

  private setSeat(seats: Seat[], transport: number [], index: number): BusSeat {
    const chair = transport[index];
    const st = seats.filter(el => el.number === chair)[0].free;
    const stmp = {0: 0, 1: 2};
    const seattmp = new BusSeat(chair, stmp[st ? 0 : 1]);
    let sel = false;
    let date = '';
    this.selected.forEach(s => {
      if (s.seatNumber === chair) {
        sel = true;
        date = s.getBlockTime()!;
      }
    });
    if (sel) {
      seattmp.seatState = 1;
      seattmp.setBlockTime(date);
    }
    return seattmp;
  }
}

