import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  notJwtEndpoints = [
    'https://gateway.viajando.transnet.cu/token',
  ];

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // add authorization header with jwt token if available
    const currentUser = sessionStorage.getItem('user_id');
    const accessToken = sessionStorage.getItem('token');

    if (!this.notJwtEndpoints.includes(request.url)) {
      if (currentUser && (request.url.includes('payment') ||
                          request.url.includes('users') ||
                          request.url.includes('reservation'))) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + accessToken
          }
        });
      } else {
        request = request.clone({
          setHeaders: {
            apikey: `${environment.disponibilidad.apiKey}`
          }
        });
      }
    }

    return next.handle(request);
  }
}
