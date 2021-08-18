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


  constructor(private timerService: TimerService) {
    this.isVisible = true;
    this.timeLeft = '10 : 00';
  }

  ngOnInit(): void {
    this.timerService.isTimerOn.subscribe((isOn) => {
      this.isTimerOn = isOn;

      if (!isOn) {
        this.timeLeft = '10 : 00';
      }

    });
    this.timerService.timeLeftsubject.subscribe((timeLeft) => {
      this.timeLeft = timeLeft;
    });
  }


}
