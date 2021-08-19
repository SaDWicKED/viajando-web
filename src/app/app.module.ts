import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from "./modules/core/interceptors";
import { ToolbarComponent } from './modules/shared/ui/header/toolbar/toolbar.component';
import {MaterialModule} from "./modules/material/material.module";
import { HeaderComponent } from './modules/shared/ui/header/header.component';
import { FooterComponent } from './modules/shared/ui/footer/footer.component';
import { SidenavComponent } from './modules/shared/ui/sidenav/sidenav.component';
import { LoaderComponent } from './modules/shared/ui/loader/loader.component';
import {SnackInfoComponent} from "./modules/shared/ui/snack-info/snack-info.component";
import { LoginRequestComponent } from './modules/shared/ui/login-request/login-request.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { ConfirmDialogComponent } from './modules/shared/ui/confirm-dialog/confirm-dialog.component';
import {FormsModule} from "@angular/forms";
import { SpinnerOverlayComponent } from './modules/shared/ui/spinner-overlay/spinner-overlay.component';
import { SpinnerComponent } from './modules/shared/ui/spinner/spinner.component';
import { QrDialogComponent } from './modules/shared/ui/qr-dialog/qr-dialog.component';
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    LoaderComponent,
    SnackInfoComponent,
    LoginRequestComponent,
    ConfirmDialogComponent,
    SpinnerOverlayComponent,
    SpinnerComponent,
    QrDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatPasswordStrengthModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [
    httpInterceptorProviders,
  ],
  entryComponents: [
    SnackInfoComponent,
    LoginRequestComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
