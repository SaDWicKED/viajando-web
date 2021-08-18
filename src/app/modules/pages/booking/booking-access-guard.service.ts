import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NavigationStatusService} from '../../shared/services/navigation-status.service';

@Injectable({
  providedIn: 'root'
})
export class BookingAccessGuard implements CanActivate {

  constructor(private router: Router, private navigationStatusService: NavigationStatusService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.navigationStatusService.getToBookingFromAvailabilityResult()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
