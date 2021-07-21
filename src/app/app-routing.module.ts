import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'availability',
    pathMatch: 'full'
  },
  {
    path: 'availability',
    loadChildren: () => import('./modules/pages/availability/availability.module')
      .then(mod => mod.AvailabilityModule)
  },
  {
    path: 'results',
    loadChildren: () => import('./modules/pages/availability-result/availability-result.module')
      .then(mod => mod.AvailabilityResultModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./modules/pages/booking/booking.module')
      .then(mod => mod.BookingModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/pages/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/pages/register/register.module')
      .then(mod => mod.RegisterModule)
  },
  {
    path: 'activate-account',
    loadChildren: () => import('./modules/pages/activate-account/activate-account.module')
      .then(mod => mod.ActivateAccountModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./modules/pages/reset-password/reset-password.module')
      .then(mod => mod.ResetPasswordModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./modules/pages/user-profile/user-profile.module')
      .then(mod => mod.UserProfileModule)
  },
  {
    path: 'agencies',
    loadChildren: () => import('./modules/pages/agencies/agencies.module')
      .then(mod => mod.AgenciesModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/pages/about/about.module')
      .then(mod => mod.AboutModule)
  },
  {
    path: 'travel-history',
    loadChildren: () => import('./modules/pages/travel-history/travel-history.module')
      .then(mod => mod.TravelHistoryModule)
  },
  {
    path: 'travelers',
    loadChildren: () => import('./modules/pages/travelers/travelers.module')
      .then(mod => mod.TravelersModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./modules/pages/faqs/faqs.module')
      .then(mod => mod.FaqsModule)
  },
  { path: '404',
    loadChildren: () => import('./modules/pages/not-found/not-found.module')
      .then(mod => mod.NotFoundModule)
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
