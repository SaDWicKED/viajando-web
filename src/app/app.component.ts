import {Component, HostListener} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {TimerService} from "./modules/shared/services/timer.service";
import {AuthService} from "./modules/shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'viajando';

  private userActivity: any;
  private userInactive: Subject<any> = new Subject();

  constructor(private router: Router,
              private timerService: TimerService,
              private authService: AuthService
  ) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      this.authService.logout();
    });
  }

  private setTimeout(): void {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 900000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  @HostListener('window:blur') onPause() {
    sessionStorage.setItem('timeLeft', this.timerService.getTimeLeft().toString());
    sessionStorage.setItem('timeWhenPaused', Date.now().toString());
  }

  @HostListener('window:focus') onResume() {
    if (this.timerService.isTimerRunning()) {
      const timeLeft = parseInt(sessionStorage.getItem('timeLeft')!, 10) ;
      const timeWhenPaused = parseInt(sessionStorage.getItem('timeWhenPaused')!, 10);
      const currentTime = Date.now();
      const timeLapsed = currentTime - timeWhenPaused;

      if (timeLapsed >= timeLeft * 1000) {
        location.reload();
      } else {
        const remainingTime = timeLeft - timeLapsed / 1000;
        if (remainingTime >= 0) {
          this.timerService.setTimeLeft(Math.round(remainingTime));
        } else {
          this.timerService.setTimeLeft(0);
        }
      }
    }
  }

}
