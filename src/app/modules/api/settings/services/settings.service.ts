/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation settings
   */
  static readonly SettingsPath = '/settings';

  /**
   * Retona la configuración del Sistema.
   *
   * Retorna las fechas máxima de venta planificada para bus,trenes y catamaran, la versión disponible de la apk, etc
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `settings()` instead.
   *
   * This method doesn't expect any request body.
   */
  settings$Response(params?: {
  }): Observable<StrictHttpResponse<Settings>> {

    const rb = new RequestBuilder(this.rootUrl, SettingsService.SettingsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Settings>;
      })
    );
  }

  /**
   * Retona la configuración del Sistema.
   *
   * Retorna las fechas máxima de venta planificada para bus,trenes y catamaran, la versión disponible de la apk, etc
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `settings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  settings(params?: {
  }): Observable<Settings> {

    return this.settings$Response(params).pipe(
      map((r: StrictHttpResponse<Settings>) => r.body as Settings)
    );
  }

}
