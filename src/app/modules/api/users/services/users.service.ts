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

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation userByName
   */
  static readonly UserByNamePath = '/users';

  /**
   * Permite obtener un usuario dado su nombre.
   *
   * Permite obtene un usuario dado su identificador
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  userByName$Response(params?: {
    userName?: string;
  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UserByNamePath, 'get');
    if (params) {
      rb.query('userName', params.userName, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * Permite obtener un usuario dado su nombre.
   *
   * Permite obtene un usuario dado su identificador
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userByName(params?: {
    userName?: string;
  }): Observable<User> {

    return this.userByName$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation updateUser
   */
  static readonly UpdateUserPath = '/users';

  /**
   * Permite actualizar un usuario dado su id.
   *
   * Permite actualizar un usuario dado su identificador
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: {
    body: User
  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UpdateUserPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * Permite actualizar un usuario dado su id.
   *
   * Permite actualizar un usuario dado su identificador
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: {
    body: User
  }): Observable<User> {

    return this.updateUser$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation user
   */
  static readonly UserPath = '/users/{id}';

  /**
   * Permite obtener un usuario dado su id.
   *
   * Permite obtene un usuario dado su identificador
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `user()` instead.
   *
   * This method doesn't expect any request body.
   */
  user$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UserPath, 'get');
    if (params) {
      rb.path('id', params.id, {"style":"simple","explode":false});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * Permite obtener un usuario dado su id.
   *
   * Permite obtene un usuario dado su identificador
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `user$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  user(params: {
    id: string;
  }): Observable<User> {

    return this.user$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

}
