import { Component, OnInit } from '@angular/core';
import {TimerService} from "../../services/timer.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isVisible: boolean;
  isTimerOn: boolean | undefined;
  timeLeft: string | undefined;

  isConnectionAvailable: boolean = navigator.onLine;

  constructor(private timerService: TimerService) {
    this.isVisible = true;
    this.timeLeft = '10 : 00';

    window.addEventListener('online', () => {
      location.reload();
    });

    window.addEventListener('offline', () => {
      this.isConnectionAvailable = false
    });
  }

  ngOnInit(): void {
    this.timerService.isTimerOn.subscribe((isOn) => {
      this.isTimerOn = isOn;

      if (!isOn) {
        this.timeLeft = '10 : 00';
      }

    });
    this.timerService.timeLeftSubject.subscribe((timeLeft) => {
      this.timeLeft = timeLeft;
    });
  }


}
