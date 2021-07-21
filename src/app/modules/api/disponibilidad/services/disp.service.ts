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

import { Agency } from '../models/agency';
import { Availability } from '../models/availability';
import { Locality } from '../models/locality';

@Injectable({
  providedIn: 'root',
})
export class DispService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation targets
   */
  static readonly TargetsPath = '/targets';

  /**
   * Retorna los destinos asociados al origen del viaje.
   *
   * Se utiliza para el select de los destinos donde se le pasa por parámetro la clave del origen seleccionado y solo devolverá los destinos para ese origen
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `targets()` instead.
   *
   * This method doesn't expect any request body.
   */
  targets$Response(params?: {
    code?: string;
  }): Observable<StrictHttpResponse<Array<Locality>>> {

    const rb = new RequestBuilder(this.rootUrl, DispService.TargetsPath, 'get');
    if (params) {
      rb.query('code', params.code, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Locality>>;
      })
    );
  }

  /**
   * Retorna los destinos asociados al origen del viaje.
   *
   * Se utiliza para el select de los destinos donde se le pasa por parámetro la clave del origen seleccionado y solo devolverá los destinos para ese origen
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `targets$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  targets(params?: {
    code?: string;
  }): Observable<Array<Locality>> {

    return this.targets$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Locality>>) => r.body as Array<Locality>)
    );
  }

  /**
   * Path part for operation localities
   */
  static readonly LocalitiesPath = '/localities';

  /**
   * Retona todas las localidades  existentes en el Sistema.
   *
   * Retorna la lista de localidades  en el sistema
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `localities()` instead.
   *
   * This method doesn't expect any request body.
   */
  localities$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Locality>>> {

    const rb = new RequestBuilder(this.rootUrl, DispService.LocalitiesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Locality>>;
      })
    );
  }

  /**
   * Retona todas las localidades  existentes en el Sistema.
   *
   * Retorna la lista de localidades  en el sistema
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `localities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  localities(params?: {
  }): Observable<Array<Locality>> {

    return this.localities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Locality>>) => r.body as Array<Locality>)
    );
  }

  /**
   * Path part for operation availabilities
   */
  static readonly AvailabilitiesPath = '/availabilities';

  /**
   * Retona la disponibilidad de pasajes existentes en el Sistema.
   *
   * Retorna la cantidad de asientos disponibles para un viaje(capac), fecha y hora de salida y llegada, clima(devuelve true si es climatizado y false si no lo es), precio del viaje, tipo(indica si el viaje es Ida o Regreso), denominación(origen-destino, si no hay disponibilidad muestra no hay), medio(devuelve el medio de transporte, Omnibus EON 43 para los omnibus y FerroT#C# para los trenes), via(por donde coge el omnibus).
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `availabilities()` instead.
   *
   * This method doesn't expect any request body.
   */
  availabilities$Response(params?: {
    source?: string;
    target?: string;
    startDate?: string;
    endDate?: string;
  }): Observable<StrictHttpResponse<Array<Availability>>> {

    const rb = new RequestBuilder(this.rootUrl, DispService.AvailabilitiesPath, 'get');
    if (params) {
      rb.query('source', params.source, {"style":"form","explode":true});
      rb.query('target', params.target, {"style":"form","explode":true});
      rb.query('startDate', params.startDate, {"style":"form","explode":true});
      rb.query('endDate', params.endDate, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Availability>>;
      })
    );
  }

  /**
   * Retona la disponibilidad de pasajes existentes en el Sistema.
   *
   * Retorna la cantidad de asientos disponibles para un viaje(capac), fecha y hora de salida y llegada, clima(devuelve true si es climatizado y false si no lo es), precio del viaje, tipo(indica si el viaje es Ida o Regreso), denominación(origen-destino, si no hay disponibilidad muestra no hay), medio(devuelve el medio de transporte, Omnibus EON 43 para los omnibus y FerroT#C# para los trenes), via(por donde coge el omnibus).
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `availabilities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  availabilities(params?: {
    source?: string;
    target?: string;
    startDate?: string;
    endDate?: string;
  }): Observable<Array<Availability>> {

    return this.availabilities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Availability>>) => r.body as Array<Availability>)
    );
  }

  /**
   * Path part for operation agencies
   */
  static readonly AgenciesPath = '/agencies';

  /**
   * Retona todas las agencias de viajes existentes en el Sistema.
   *
   * Retorna la lista de agencias en el sistema
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `agencies()` instead.
   *
   * This method doesn't expect any request body.
   */
  agencies$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Agency>>> {

    const rb = new RequestBuilder(this.rootUrl, DispService.AgenciesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Agency>>;
      })
    );
  }

  /**
   * Retona todas las agencias de viajes existentes en el Sistema.
   *
   * Retorna la lista de agencias en el sistema
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `agencies$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  agencies(params?: {
  }): Observable<Array<Agency>> {

    return this.agencies$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Agency>>) => r.body as Array<Agency>)
    );
  }

}
