import { Route } from '@angular/router';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { TechRadarComponent } from './pages/techRadar/techRadar.component';

export const appRoutes: Route[] = [
  { path: '', component: TechRadarComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'tech-radar', component: TechRadarComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/tech-radar', pathMatch: 'full' }
];
