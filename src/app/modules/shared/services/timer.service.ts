import { Injectable } from '@angular/core';
import {interval, Subject, Subscription} from 'rxjs';
import {finalize, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer = interval(1000).pipe(take(1000));
  private timerStarted = false;
  private timeLeft = 600; // in seconds
  private subscription: Subscription | undefined;
  isTimerOn = new Subject<boolean>();
  timeLeftsubject = new Subject<string>();

  constructor() {
  }

  startTimer(): void {
    this.timerStarted = true;
    this.timeLeft = 600;
    this.isTimerOn.next(this.timerStarted);
    this.subscription = this.timer.pipe(
      finalize(() => {
        this.timerStarted = false;
        this.isTimerOn.next(this.timerStarted);
      })).subscribe(() => {
      this.timeLeftsubject.next(TimerService.timeFormat(this.timeLeft));
      if (this.timeLeft === 0) {
        this.stopTimer();
        alert('Su tiempo para reservar se ha agotado');
        location.reload();
      }
      this.timeLeft -= 1;
    });
  }

  stopTimer() {
    this.subscription!.unsubscribe();
  }

  getTimeLeft() {
    return this.timeLeft;
  }

  setTimeLeft(time: number) {
    this.timeLeft = time;
  }

  private static timeFormat(value: number): string {
    // MM:SS format
    const minutes: number = Math.floor(value / 60);
    return (
      minutes +
      ' : ' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

  isTimerRunning() {
    return this.timerStarted;
  }
}
