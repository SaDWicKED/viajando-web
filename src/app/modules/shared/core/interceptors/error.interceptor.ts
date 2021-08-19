import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {SnackInfoService} from "../../services/snack-info.service";
import {Injectable} from "@angular/core";
import {flatMap} from "rxjs/internal/operators";
import {AuthService} from "../../services/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackInfoService: SnackInfoService,
              private authService: AuthService) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
          let errorMessage: string = '';
          const currentUser = sessionStorage.getItem('user_id');
          if ([401, 403].includes(error.status) && currentUser) { // and current user exist
            // refresh token
            return this.refreshEverything().pipe(
              switchMap(() => {
                return next.handle(request);
              }), catchError(error1 => {
                if ([401, 403].includes(error1.status)) {
                  this.authService.logout();
                  errorMessage = 'No esta autorizado para realizar la operación';
                }
                return EMPTY;
              }));
          } else if (error.url?.includes('login')) {
            if (error.status === 400) {
              errorMessage = error.error.message;
            }
          } else if (error.url?.includes('users')) {
            if (error.status === 409) {
              errorMessage = 'Error al registrar usuario. El nombre de usuario elegido ya existe';
            }
            if (error.status === 500) {
              errorMessage = 'No se pudo actualizar el usuario: ' + error.error.message;
            }
          } else if (error.url?.includes('active')) {
            if (error.status === 400) {
              errorMessage = 'Error. El codigo de activación no es correcto';
            }
          } else if (error.url?.includes('seatMaps')) {
            if (error.status === 500) {
              errorMessage = 'Tiene una factura pendiente o ha alcanzado el máximo de operaciones diarias';
            }
          } else  if (error.url?.includes('orders')) {
            if (error.status === 0 && error.error instanceof ProgressEvent) {
              errorMessage = 'Error de conexión';
            } else {
              errorMessage = error.error.message + ': ' + error.error.description;
            }
          } else if (error.status === 0 && error.error instanceof ProgressEvent) {
            errorMessage = 'Error de conexión';
          } else {
            errorMessage = error.error.message;
          }
          console.log(error);
          this.snackInfoService.showSnackBar(errorMessage);
          return throwError(errorMessage);
        })
      )
  }

  // refresca todos los tokens
  private refreshEverything(): Observable<any> {
    const refreshToken = JSON.parse(sessionStorage.getItem('user_id')!).refreshToken;
    return this.authService.refreshToken(refreshToken).pipe(
      flatMap(tokenData => {
        sessionStorage.setItem('user_id', JSON.stringify(tokenData));
        return this.authService.getToken().pipe(
          tap(token => {
            sessionStorage.setItem('token', token.access_token!);
          })
        );
      } )
    );
  }
}
