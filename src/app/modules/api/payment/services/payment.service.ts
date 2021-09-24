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

import { Message } from '../models/message';
import { Order } from '../models/order';
import { PendingInvoice } from '../models/pending-invoice';
import { RefundInvoice } from '../models/refund-invoice';
import { RefundResponse } from '../models/refund-response';
import { RefundTicket } from '../models/refund-ticket';
import { RefundTickets } from '../models/refund-tickets';
import { Refunds } from '../models/refunds';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation ordersGet
   */
  static readonly OrdersGetPath = '/orders';

  /**
   * Permite obtener una orden de pago en el sistema dado su id.
   *
   * Permite obtener una orden de pago en el sistema dado su id. Las aplicaciones clientes necesitan consultar el estado de la orden para poder continuar con el proceso de pago.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ordersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  ordersGet$Response(params?: {
    id?: string;
  }): Observable<StrictHttpResponse<Order>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentService.OrdersGetPath, 'get');
    if (params) {
      rb.query('id', params.id, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Order>;
      })
    );
  }

  /**
   * Permite obtener una orden de pago en el sistema dado su id.
   *
   * Permite obtener una orden de pago en el sistema dado su id. Las aplicaciones clientes necesitan consultar el estado de la orden para poder continuar con el proceso de pago.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `ordersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ordersGet(params?: {
    id?: string;
  }): Observable<Order> {

    return this.ordersGet$Response(params).pipe(
      map((r: StrictHttpResponse<Order>) => r.body as Order)
    );
  }

  /**
   * Path part for operation ordersPost
   */
  static readonly OrdersPostPath = '/orders';

  /**
   * Permite insertar una orden de pago en el sistema.
   *
   * Se envía los datos del cliente y los boletines para generar la orden de pago. Retorna la orden insertada en el servidor de ordenes esta orden tiene un id unico por el que se recomianda a las aplicaciones clientes consultar el estado (1-creada, 2-precesandose, 3-completado, 4-error) de la orden para saber si se completo u ocurrio algun error.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ordersPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ordersPost$Response(params: {
    body: Order
  }): Observable<StrictHttpResponse<Order>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentService.OrdersPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Order>;
      })
    );
  }

  /**
   * Permite insertar una orden de pago en el sistema.
   *
   * Se envía los datos del cliente y los boletines para generar la orden de pago. Retorna la orden insertada en el servidor de ordenes esta orden tiene un id unico por el que se recomianda a las aplicaciones clientes consultar el estado (1-creada, 2-precesandose, 3-completado, 4-error) de la orden para saber si se completo u ocurrio algun error.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `ordersPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  ordersPost(params: {
    body: Order
  }): Observable<Order> {

    return this.ordersPost$Response(params).pipe(
      map((r: StrictHttpResponse<Order>) => r.body as Order)
    );
  }

  /**
   * Path part for operation ordersDelete
   */
  static readonly OrdersDeletePath = '/orders';

  /**
   * Permite eliminar una orden de pago en el sistema dado su id.
   *
   * Permite eliminar una orden de pago en el sistema dado su id. Las ordenes tiene un tiempo de vida de 10 minutos en el servidor de ordendes luego son eliminadas por el mismo servidor.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `ordersDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  ordersDelete$Response(params?: {
    id?: string;
  }): Observable<StrictHttpResponse<Message>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentService.OrdersDeletePath, 'delete');
    if (params) {
      rb.query('id', params.id, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Message>;
      })
    );
  }

  /**
   * Permite eliminar una orden de pago en el sistema dado su id.
   *
   * Permite eliminar una orden de pago en el sistema dado su id. Las ordenes tiene un tiempo de vida de 10 minutos en el servidor de ordendes luego son eliminadas por el mismo servidor.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `ordersDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  ordersDelete(params?: {
    id?: string;
  }): Observable<Message> {

    return this.ordersDelete$Response(params).pipe(
      map((r: StrictHttpResponse<Message>) => r.body as Message)
    );
  }

  /**
   * Path part for operation pendingInvoices
   */
  static readonly PendingInvoicesPath = '/pendingInvoices';

  /**
   * Retorna la lista de facturas en proceso o pendientes por procesar para un usuario.
   *
   * Retorna el id de la factura, el tiempo(en segundos) que le queda de vida a esa factura y el importe de esa factura
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pendingInvoices()` instead.
   *
   * This method doesn't expect any request body.
   */
  pendingInvoices$Response(params?: {
    userId?: string;
  }): Observable<StrictHttpResponse<Array<PendingInvoice>>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentService.PendingInvoicesPath, 'get');
    if (params) {
      rb.query('userId', params.userId, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PendingInvoice>>;
      })
    );
  }

  /**
   * Retorna la lista de facturas en proceso o pendientes por procesar para un usuario.
   *
   * Retorna el id de la factura, el tiempo(en segundos) que le queda de vida a esa factura y el importe de esa factura
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pendingInvoices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pendingInvoices(params?: {
    userId?: string;
  }): Observable<Array<PendingInvoice>> {

    return this.pendingInvoices$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PendingInvoice>>) => r.body as Array<PendingInvoice>)
    );
  }

  /**
   * Path part for operation requestRefundPayByTikets
   */
  static readonly RequestRefundPayByTiketsPath = '/requestRefundPayByTikets';

  /**
   * Retorna una lista con las solicitudes que se pudiero o no insertar para el reintegro de los boletines especificados.
   *
   * Retorna una lista con las solicitudes que se pudiero o no insertar para el reintegro de los boletines especificados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRefundPayByTikets()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRefundPayByTikets$Response(params: {
    body: RefundTickets
  }): Observable<StrictHttpResponse<Array<Refunds>>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentService.RequestRefundPayByTiketsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Refunds>>;
      })
    );
  }

  /**
   * Retorna una lista con las solicitudes que se pudiero o no insertar para el reintegro de los boletines especificados.
   *
   * Retorna una lista con las solicitudes que se pudiero o no insertar para el reintegro de los boletines especificados
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `requestRefundPayByTikets$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRefundPayByTikets(params: {
    body: RefundTickets
  }): Observable<Array<Refunds>> {

    return this.requestRefundPayByTikets$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Refunds>>) => r.body as Array<Refunds>)
    );
  }

  /**
   * Path part for operation requestRefundPayByTiket
   */
  static readonly RequestRefundPayByTiketPath = '/requestRefundPayByTiket';

  /**
   * Retorna si se pudo o no insertar la solicitud para el reintegro.
   *
   * Retorna si se pudo o no insertar la solicitud de reintegro dado un boletin
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRefundPayByTiket()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRefundPayByTiket$Response(params: {
    body: RefundTicket
  }): Observable<StrictHttpResponse<RefundResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentService.RequestRefundPayByTiketPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RefundResponse>;
      })
    );
  }

  /**
   * Retorna si se pudo o no insertar la solicitud para el reintegro.
   *
   * Retorna si se pudo o no insertar la solicitud de reintegro dado un boletin
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `requestRefundPayByTiket$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRefundPayByTiket(params: {
    body: RefundTicket
  }): Observable<RefundResponse> {

    return this.requestRefundPayByTiket$Response(params).pipe(
      map((r: StrictHttpResponse<RefundResponse>) => r.body as RefundResponse)
    );
  }

  /**
   * Path part for operation requestRefundPayByInvoice
   */
  static readonly RequestRefundPayByInvoicePath = '/requestRefundPayByInvoice';

  /**
   * Retorna si se pudo o no insertar la solicitud de reintegro.
   *
   * Retorna si se pudo o no insertar la solicitud de reintegro para la factura
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestRefundPayByInvoice()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRefundPayByInvoice$Response(params: {
    body: RefundInvoice
  }): Observable<StrictHttpResponse<RefundResponse>> {

    const rb = new RequestBuilder(this.rootUrl, PaymentService.RequestRefundPayByInvoicePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RefundResponse>;
      })
    );
  }

  /**
   * Retorna si se pudo o no insertar la solicitud de reintegro.
   *
   * Retorna si se pudo o no insertar la solicitud de reintegro para la factura
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `requestRefundPayByInvoice$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  requestRefundPayByInvoice(params: {
    body: RefundInvoice
  }): Observable<RefundResponse> {

    return this.requestRefundPayByInvoice$Response(params).pipe(
      map((r: StrictHttpResponse<RefundResponse>) => r.body as RefundResponse)
    );
  }

}
