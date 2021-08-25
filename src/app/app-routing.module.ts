import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'availability',
    pathMatch: 'full'
  },
  {
    path: 'availability',
    loadChildren: () => import('./modules/pages/availability/availability.module')
      .then(mod => mod.AvailabilityModule).catch(() => location.reload())
  },
  {
    path: 'results',
    loadChildren: () => import('./modules/pages/availability-result/availability-result.module')
      .then(mod => mod.AvailabilityResultModule).catch(() => location.reload())
  },
  {
    path: 'booking',
    loadChildren: () => import('./modules/pages/booking/booking.module')
      .then(mod => mod.BookingModule).catch(() => location.reload())
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/pages/login/login.module')
      .then(mod => mod.LoginModule).catch(() => location.reload())
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/pages/register/register.module')
      .then(mod => mod.RegisterModule).catch(() => location.reload())
  },
  {
    path: 'activate-account',
    loadChildren: () => import('./modules/pages/activate-account/activate-account.module')
      .then(mod => mod.ActivateAccountModule).catch(() => location.reload())
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./modules/pages/reset-password/reset-password.module')
      .then(mod => mod.ResetPasswordModule).catch(() => location.reload())
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./modules/pages/user-profile/user-profile.module')
      .then(mod => mod.UserProfileModule).catch(() => location.reload())
  },
  {
    path: 'agencies',
    loadChildren: () => import('./modules/pages/agencies/agencies.module')
      .then(mod => mod.AgenciesModule).catch(() => location.reload())
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/pages/about/about.module')
      .then(mod => mod.AboutModule).catch(() => location.reload())
  },
  {
    path: 'travel-history',
    loadChildren: () => import('./modules/pages/travel-history/travel-history.module')
      .then(mod => mod.TravelHistoryModule).catch(() => location.reload())
  },
  {
    path: 'travelers',
    loadChildren: () => import('./modules/pages/travelers/travelers.module')
      .then(mod => mod.TravelersModule).catch(() => location.reload())
  },
  {
    path: 'faqs',
    loadChildren: () => import('./modules/pages/faqs/faqs.module')
      .then(mod => mod.FaqsModule).catch(() => location.reload())
  },
  { path: '404',
    loadChildren: () => import('./modules/pages/not-found/not-found.module')
      .then(mod => mod.NotFoundModule).catch(() => location.reload())
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
