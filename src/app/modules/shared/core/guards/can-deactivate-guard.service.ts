import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';

export interface CanComponenDeactivate {
  canDeactivate: (component: CanComponenDeactivate,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean ;
}

export class CanDeactivateGuard implements CanDeactivate<CanComponenDeactivate> {
  canDeactivate(component: CanComponenDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate(component, currentRoute, currentState, nextState);
  }
}

