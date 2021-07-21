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

import { SetPassword } from '../models/set-password';
import { Tokens } from '../models/tokens';
import { User } from '../models/user';
import { UserData } from '../models/user-data';

@Injectable({
  providedIn: 'root',
})
export class SecurityService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation insertUser
   */
  static readonly InsertUserPath = '/users';

  /**
   * Permite adicionar un usuario.
   *
   * Permite adicionar un usuario al sistema
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertUser$Response(params: {
    body: User
  }): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.InsertUserPath, 'post');
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
   * Permite adicionar un usuario.
   *
   * Permite adicionar un usuario al sistema
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertUser(params: {
    body: User
  }): Observable<User> {

    return this.insertUser$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation setPassword
   */
  static readonly SetPasswordPath = '/setPassword';

  /**
   * Permite cambiar la contraseña del usuario.
   *
   * Permite cambiar la contraseña del usuario
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setPassword$Response(params: {
    body: SetPassword
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.SetPasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Permite cambiar la contraseña del usuario.
   *
   * Permite cambiar la contraseña del usuario
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  setPassword(params: {
    body: SetPassword
  }): Observable<void> {

    return this.setPassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation refreshToken
   */
  static readonly RefreshTokenPath = '/refreshToken';

  /**
   * Permite actualizar el token de acceso otorgado durante el proceso de autenticación.
   *
   * Permite actualizar el token de acceso otorgado durante el proceso de autenticación
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshToken$Response(params?: {
    token?: string;
  }): Observable<StrictHttpResponse<Tokens>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.RefreshTokenPath, 'post');
    if (params) {
      rb.query('token', params.token, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Tokens>;
      })
    );
  }

  /**
   * Permite actualizar el token de acceso otorgado durante el proceso de autenticación.
   *
   * Permite actualizar el token de acceso otorgado durante el proceso de autenticación
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `refreshToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshToken(params?: {
    token?: string;
  }): Observable<Tokens> {

    return this.refreshToken$Response(params).pipe(
      map((r: StrictHttpResponse<Tokens>) => r.body as Tokens)
    );
  }

  /**
   * Path part for operation login
   */
  static readonly LoginPath = '/login';

  /**
   * Permite autenticarse en el servidor de identidad.
   *
   * Permite autenticarse en el servidor de identidad. Retorna una identidad digital
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: {
    body: UserData
  }): Observable<StrictHttpResponse<Tokens>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.LoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Tokens>;
      })
    );
  }

  /**
   * Permite autenticarse en el servidor de identidad.
   *
   * Permite autenticarse en el servidor de identidad. Retorna una identidad digital
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: {
    body: UserData
  }): Observable<Tokens> {

    return this.login$Response(params).pipe(
      map((r: StrictHttpResponse<Tokens>) => r.body as Tokens)
    );
  }

  /**
   * Path part for operation recoverPassword
   */
  static readonly RecoverPasswordPath = '/recoverPassword';

  /**
   * Permite solicitar un código para cambiar la contraseña del usuario.
   *
   * Para cambiar la contraseña el usuario debe enviar esta solicituda y  el servidor de identidad le envíara por correo una clave o código para cambiar la contraseña la cual el usuario debe introducir junto con la nueva contraseña( ver setPassword)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `recoverPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  recoverPassword$Response(params?: {
    userName?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.RecoverPasswordPath, 'get');
    if (params) {
      rb.query('userName', params.userName, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Permite solicitar un código para cambiar la contraseña del usuario.
   *
   * Para cambiar la contraseña el usuario debe enviar esta solicituda y  el servidor de identidad le envíara por correo una clave o código para cambiar la contraseña la cual el usuario debe introducir junto con la nueva contraseña( ver setPassword)
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `recoverPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  recoverPassword(params?: {
    userName?: string;
  }): Observable<void> {

    return this.recoverPassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation active
   */
  static readonly ActivePath = '/active';

  /**
   * Permite activar la cuenta de un usuario en el sistema.
   *
   * Permite activar la cuenta de un usuario dado el código de activación enviado por correo al registrarse en el sistema
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `active()` instead.
   *
   * This method doesn't expect any request body.
   */
  active$Response(params?: {
    code?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.ActivePath, 'get');
    if (params) {
      rb.query('code', params.code, {"style":"form","explode":true});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Permite activar la cuenta de un usuario en el sistema.
   *
   * Permite activar la cuenta de un usuario dado el código de activación enviado por correo al registrarse en el sistema
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `active$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  active(params?: {
    code?: string;
  }): Observable<void> {

    return this.active$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
