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

import { AddClient } from '../models/add-client';
import { Block } from '../models/block';
import { BlockSeat } from '../models/block-seat';
import { Client } from '../models/client';
import { Clients } from '../models/clients';
import { EndOfTravel } from '../models/end-of-travel';
import { Quantity } from '../models/quantity';
import { Seat } from '../models/seat';
import { Travel } from '../models/travel';
import { UnBlock } from '../models/un-block';
import { UnBlockSeat } from '../models/un-block-seat';
import { UnBlocks } from '../models/un-blocks';

@Injectable({
  providedIn: 'root',
})
export class ResService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation unblockSeat
   */
  static readonly UnblockSeatPath = '/unblockSeat';

  /**
   * Permite desbloquear un asiento o un grupo de asientos en un viaje si todos fueron bloqueados al mismo tiempo.
   *
   * Desbloquear un asiento o un grupo de asientos en un viaje
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unblockSeat()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  unblockSeat$Response(params: {
    body: UnBlock
  }): Observable<StrictHttpResponse<UnBlockSeat>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.UnblockSeatPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UnBlockSeat>;
      })
    );
  }

  /**
   * Permite desbloquear un asiento o un grupo de asientos en un viaje si todos fueron bloqueados al mismo tiempo.
   *
   * Desbloquear un asiento o un grupo de asientos en un viaje
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unblockSeat$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  unblockSeat(params: {
    body: UnBlock
  }): Observable<UnBlockSeat> {

    return this.unblockSeat$Response(params).pipe(
      map((r: StrictHttpResponse<UnBlockSeat>) => r.body as UnBlockSeat)
    );
  }

  /**
   * Path part for operation unblockSeats
   */
  static readonly UnblockSeatsPath = '/unblockSeats';

  /**
   * Permite desbloquear los asientos selecionados por un usuario.
   *
   * Desbloquear un grupo de asientos en un viaje
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unblockSeats()` instead.
   *
   * This method doesn't expect any request body.
   */
  unblockSeats$Response(params?: {
    userId?: string;
  }): Observable<StrictHttpResponse<Array<UnBlockSeat>>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.UnblockSeatsPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UnBlockSeat>>;
      })
    );
  }

  /**
   * Permite desbloquear los asientos selecionados por un usuario.
   *
   * Desbloquear un grupo de asientos en un viaje
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unblockSeats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unblockSeats(params?: {
    userId?: string;
  }): Observable<Array<UnBlockSeat>> {

    return this.unblockSeats$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UnBlockSeat>>) => r.body as Array<UnBlockSeat>)
    );
  }

  /**
   * Path part for operation unblockSeatsPost
   */
  static readonly UnblockSeatsPostPath = '/unblockSeats';

  /**
   * Permite desbloquear un grupo de asientos en un viaje.
   *
   * Desbloquear un grupo de asientos en un viaje
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unblockSeatsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  unblockSeatsPost$Response(params: {
    body: UnBlocks
  }): Observable<StrictHttpResponse<Array<UnBlockSeat>>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.UnblockSeatsPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UnBlockSeat>>;
      })
    );
  }

  /**
   * Permite desbloquear un grupo de asientos en un viaje.
   *
   * Desbloquear un grupo de asientos en un viaje
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unblockSeatsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  unblockSeatsPost(params: {
    body: UnBlocks
  }): Observable<Array<UnBlockSeat>> {

    return this.unblockSeatsPost$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UnBlockSeat>>) => r.body as Array<UnBlockSeat>)
    );
  }

  /**
   * Path part for operation insertClient
   */
  static readonly InsertClientPath = '/insertClient';

  /**
   * Permite agregar un cliente al sistema.
   *
   * Se registra el nombre y el carnet de identidad del viajero en la BD
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertClient()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertClient$Response(params: {
    body: Client
  }): Observable<StrictHttpResponse<AddClient>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.InsertClientPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AddClient>;
      })
    );
  }

  /**
   * Permite agregar un cliente al sistema.
   *
   * Se registra el nombre y el carnet de identidad del viajero en la BD
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertClient$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertClient(params: {
    body: Client
  }): Observable<AddClient> {

    return this.insertClient$Response(params).pipe(
      map((r: StrictHttpResponse<AddClient>) => r.body as AddClient)
    );
  }

  /**
   * Path part for operation insertClients
   */
  static readonly InsertClientsPath = '/insertClients';

  /**
   * Permite agregar un grupo de clientes al sistema.
   *
   * Se registra el nombre y el carnet de identidad del viajero en la BD del sistema
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertClients()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertClients$Response(params: {
    body: Clients
  }): Observable<StrictHttpResponse<Array<AddClient>>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.InsertClientsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AddClient>>;
      })
    );
  }

  /**
   * Permite agregar un grupo de clientes al sistema.
   *
   * Se registra el nombre y el carnet de identidad del viajero en la BD del sistema
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertClients$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertClients(params: {
    body: Clients
  }): Observable<Array<AddClient>> {

    return this.insertClients$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AddClient>>) => r.body as Array<AddClient>)
    );
  }

  /**
   * Path part for operation blockSeat
   */
  static readonly BlockSeatPath = '/blockSeat';

  /**
   * Permite bloquear un asiento.
   *
   * Bloquear un asiento
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `blockSeat()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  blockSeat$Response(params: {
    body: Block
  }): Observable<StrictHttpResponse<BlockSeat>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.BlockSeatPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BlockSeat>;
      })
    );
  }

  /**
   * Permite bloquear un asiento.
   *
   * Bloquear un asiento
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `blockSeat$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  blockSeat(params: {
    body: Block
  }): Observable<BlockSeat> {

    return this.blockSeat$Response(params).pipe(
      map((r: StrictHttpResponse<BlockSeat>) => r.body as BlockSeat)
    );
  }

  /**
   * Path part for operation travels
   */
  static readonly TravelsPath = '/travels';

  /**
   * Retona  los viajes que un usuario haya comprado en los últimos 30 días.
   *
   * Retorna la lista de viajes dado el usuario
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `travels()` instead.
   *
   * This method doesn't expect any request body.
   */
  travels$Response(params?: {
    userId?: string;
  }): Observable<StrictHttpResponse<Array<Travel>>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.TravelsPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Travel>>;
      })
    );
  }

  /**
   * Retona  los viajes que un usuario haya comprado en los últimos 30 días.
   *
   * Retorna la lista de viajes dado el usuario
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `travels$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  travels(params?: {
    userId?: string;
  }): Observable<Array<Travel>> {

    return this.travels$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Travel>>) => r.body as Array<Travel>)
    );
  }

  /**
   * Path part for operation tickets
   */
  static readonly TicketsPath = '/tickets';

  /**
   * Retona la cantidad de boletos que le quedan por comprar en el día al usuario que está comprando los pasajes.
   *
   * Retorna  la cantidad de boletos que le quedan por comprar en el día a un usuario
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tickets()` instead.
   *
   * This method doesn't expect any request body.
   */
  tickets$Response(params?: {
    userId?: string;
  }): Observable<StrictHttpResponse<Quantity>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.TicketsPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Quantity>;
      })
    );
  }

  /**
   * Retona la cantidad de boletos que le quedan por comprar en el día al usuario que está comprando los pasajes.
   *
   * Retorna  la cantidad de boletos que le quedan por comprar en el día a un usuario
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `tickets$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  tickets(params?: {
    userId?: string;
  }): Observable<Quantity> {

    return this.tickets$Response(params).pipe(
      map((r: StrictHttpResponse<Quantity>) => r.body as Quantity)
    );
  }

  /**
   * Path part for operation seatMaps
   */
  static readonly SeatMapsPath = '/seatMaps';

  /**
   * Retona el plano o mapa de asientos  para un  viaje.
   *
   * Retorna el mapa de asientos
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `seatMaps()` instead.
   *
   * This method doesn't expect any request body.
   */
  seatMaps$Response(params?: {
    travelId?: string;
    source?: string;
    target?: string;
    userId?: string;
  }): Observable<StrictHttpResponse<Array<Seat>>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.SeatMapsPath, 'get');
    if (params) {
      rb.query('travelId', params.travelId, {"style":"form","explode":true});
      rb.query('source', params.source, {"style":"form","explode":true});
      rb.query('target', params.target, {"style":"form","explode":true});
      rb.query('userId', params.userId, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Seat>>;
      })
    );
  }

  /**
   * Retona el plano o mapa de asientos  para un  viaje.
   *
   * Retorna el mapa de asientos
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `seatMaps$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  seatMaps(params?: {
    travelId?: string;
    source?: string;
    target?: string;
    userId?: string;
  }): Observable<Array<Seat>> {

    return this.seatMaps$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Seat>>) => r.body as Array<Seat>)
    );
  }

  /**
   * Path part for operation isEndOfTravel
   */
  static readonly IsEndOfTravelPath = '/isEndOfTravel';

  /**
   * Utilizado para saber si un destino es el final de una ruta o viaje.
   *
   * Se utiliza para bloquear la compra si el viaje no es hasta el destino final. Devuelve 0 si no es final y 1 si lo es
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `isEndOfTravel()` instead.
   *
   * This method doesn't expect any request body.
   */
  isEndOfTravel$Response(params?: {
    travelId?: string;
    endpoint?: string;
  }): Observable<StrictHttpResponse<EndOfTravel>> {

    const rb = new RequestBuilder(this.rootUrl, ResService.IsEndOfTravelPath, 'get');
    if (params) {
      rb.query('travelId', params.travelId, {"style":"form","explode":true});
      rb.query('endpoint', params.endpoint, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EndOfTravel>;
      })
    );
  }

  /**
   * Utilizado para saber si un destino es el final de una ruta o viaje.
   *
   * Se utiliza para bloquear la compra si el viaje no es hasta el destino final. Devuelve 0 si no es final y 1 si lo es
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `isEndOfTravel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  isEndOfTravel(params?: {
    travelId?: string;
    endpoint?: string;
  }): Observable<EndOfTravel> {

    return this.isEndOfTravel$Response(params).pipe(
      map((r: StrictHttpResponse<EndOfTravel>) => r.body as EndOfTravel)
    );
  }

}
