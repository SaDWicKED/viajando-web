import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutModule } from './modules/pages/about/about.module';
import { ActivateAccountModule } from './modules/pages/activate-account/activate-account.module';
import { AgenciesModule } from './modules/pages/agencies/agencies.module';
import { BookingModule } from './modules/pages/booking/booking.module';
import { AvailabilityModule } from './modules/pages/availability/availability.module';
import { AvailabilityResultModule } from './modules/pages/availability-result/availability-result.module';
import { FaqsModule } from './modules/pages/faqs/faqs.module';
import { LoginModule } from './modules/pages/login/login.module';
import { NotFoundModule } from './modules/pages/not-found/not-found.module';
import { RegisterModule } from './modules/pages/register/register.module';
import { ResetPasswordModule } from './modules/pages/reset-password/reset-password.module';
import { TravelHistoryModule } from './modules/pages/travel-history/travel-history.module';
import { TravelersModule } from './modules/pages/travelers/travelers.module';
import { UserProfileModule } from './modules/pages/user-profile/user-profile.module';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from "./modules/core/interceptors";
import { ToolbarComponent } from './modules/ui/header/toolbar/toolbar.component';
import {MaterialModule} from "./modules/material/material.module";
import { HeaderComponent } from './modules/ui/header/header.component';
import { FooterComponent } from './modules/ui/footer/footer.component';
import { SidenavComponent } from './modules/ui/sidenav/sidenav.component';
import { LoaderComponent } from './modules/ui/loader/loader.component';
import {SnackInfoComponent} from "./modules/ui/snack-info/snack-info.component";
import { LoginRequestComponent } from './modules/ui/login-redirection/login-request.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { ConfirmDialogComponent } from './modules/ui/confirm-dialog/confirm-dialog.component';
import {FormsModule} from "@angular/forms";

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
    ConfirmDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AboutModule,
    ActivateAccountModule,
    AgenciesModule,
    BookingModule,
    AvailabilityModule,
    AvailabilityResultModule,
    FaqsModule,
    LoginModule,
    NotFoundModule,
    RegisterModule,
    ResetPasswordModule,
    TravelHistoryModule,
    TravelersModule,
    UserProfileModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatPasswordStrengthModule,
    FormsModule
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
