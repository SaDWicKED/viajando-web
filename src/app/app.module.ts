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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./modules/core/interceptors/error.interceptor";

@NgModule({
  declarations: [
    AppComponent
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
    UserProfileModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
