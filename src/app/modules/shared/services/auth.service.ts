import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../api/auth/models/user";
import {SecurityService} from "../../api/auth/services/security.service";
import {Tokens} from "../../api/auth/models/tokens";
import jwt_decode from 'jwt-decode';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User> | undefined;

  constructor(private httpClient: HttpClient,
              private securityService: SecurityService,) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser') + ''));
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('currentUser') != null;
  }

  login(userName: string, password: string): Observable<User> {
    return this.securityService.login(
      {body: {password, userName}}
    ).pipe( map(
      data => {
        sessionStorage.setItem('user_id', JSON.stringify(data));
        sessionStorage.setItem('token', data.accessToken + '');
        const token = data.idToken;
        const userData: any = jwt_decode(token + '');

        const user: User = {
          userName,
          id: userData.userId,
          lastName: userData.family_name,
          firstName: userData.given_name,
          email: userData.email,
          ci: userData.ci,
          locality: userData.localityAddress,
          mobile: userData.mobile,
          state: userData.stateOrProvinceName
        };

        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('lastUser', user.id + '');
        this.currentUserSubject.next(user);

        return user;
      }
    ));
  }

  logout(): void {
    // remove user from session storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('token');
    this.currentUserSubject.next({});
  }

  refreshToken(token: string): Observable<Tokens> {
    return this.securityService.refreshToken({token});
  }

  getToken(): Observable<Tokens> {
    const user = JSON.parse(sessionStorage.getItem('user_id') + '');
    const params = new HttpParams()
      .set('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer')
      .set('assertion', user.idToken);

    const httpOptions = {
      headers: new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Basic cTNfM1RfdG9vQndyMENpRjI4MDJ1OFRnSXI4YTpJeUZYdzNCdV9qbExBQnBMSThsc0RrTHl1Zmdh')
    };

    return this.httpClient.post<any>('https://gateway.viajando.transnet.cu/token', params, httpOptions );
  }
}
