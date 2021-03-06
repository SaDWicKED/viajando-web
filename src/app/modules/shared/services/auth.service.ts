import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../api/auth/models/user";
import {SecurityService} from "../../api/auth/services/security.service";
import jwt_decode from 'jwt-decode';
import {map} from "rxjs/operators";
import {Traveler} from "../models/traveler";
import {Router} from "@angular/router";
import {ConfirmDialogComponent} from "../ui/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User> | undefined;

  constructor(private httpClient: HttpClient,
              private securityService: SecurityService,
              private router: Router,
              private dialog: MatDialog) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')!));
  }

  // devuelve verdadero si el usuario esta autenticado
  isAuthenticated(): boolean {
    return sessionStorage.getItem('currentUser') != null;
  }

  // realiza el login de un usuario
  login(userName: string, password: string): Observable<User> {
    return this.securityService.login(
      {body: {password, userName}}
    ).pipe( map(
      data => {
        sessionStorage.setItem('user_id', JSON.stringify(data));
        sessionStorage.setItem('token', data.accessToken!);
        const token = data.idToken;
        const userData: any = jwt_decode(token!);

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
        sessionStorage.setItem('lastUser', user.id!);
        this.currentUserSubject.next(user);

        if (!localStorage.getItem('viajeros' + user.id)) {
          const travelers = [
            new Traveler(user.firstName + ' ' + user.lastName, user.ci + '' ),
          ];
          localStorage['viajeros' + user.id] = JSON.stringify(travelers);
        }
        return user;
      }
    ));
  }

  // desloguear al usuario
  logout(confirmation?: boolean): void {
    if (confirmation) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        width: '500px',
        data: {
          title: 'Cerrar Sesi??n',
          content: '??Est?? seguro de que desea cerrar su sesi??n?',
          cancelText: 'no',
          acceptText: 'si',
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // remove user from session storage to log user out
          this.deleteUserData();
        }
      });
    } else {
      this.deleteUserData();
    }
  }

  // elimina la informacion del usuario
  private deleteUserData(): void {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('token');
    this.router.navigate(['login'])
    this.currentUserSubject.next({});
  }

  // refresca el token AM
  refreshToken(token: string): Observable<any> {
    return this.securityService.refreshToken({token});
  }

  // ontiene el token IS
  getToken(): Observable<any> {
    const user = JSON.parse(sessionStorage.getItem('user_id')!);
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

  // cambiar la contrase??a del usuario
  sendPasswordUpdate(code: string, password: string): Observable<void> {
    return this.securityService.setPassword({body: {code, password}});
  }

  //  solicita el codigo para cambiar la contrase??a
  requestPasswordChange(userName: string): Observable<void> {
    return this.securityService.recoverPassword({userName});
  }
}
