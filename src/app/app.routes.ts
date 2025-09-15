import { Routes } from '@angular/router';
import { authGuard } from './core/authentication/auth-guard';
import { Login } from './modules/auth/login/login';
import { Home } from './modules/home/components/home/home';


export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'calendar', loadChildren: () => import('./modules/calendar/calendar-module').then(m => m.CalendarModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
