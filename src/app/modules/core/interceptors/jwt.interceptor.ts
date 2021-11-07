import { Injectable } from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  notJwtEndpoints = [
    'https://gateway.viajando.transnet.cu/token',
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = sessionStorage.getItem('user_id');
    const accessToken = sessionStorage.getItem('token');

    if (!this.notJwtEndpoints.includes(request.url)) {
      if (currentUser && (request.url.includes('payment') ||
        request.url.includes('users') ||
        request.url.includes('reservation') ||
        request.url.includes('refund'))) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + accessToken
          }
        });
      } else {
        request = request.clone({
          setHeaders: {
            apikey: `${environment.availability.apiKey}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
