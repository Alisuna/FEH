import { Routes } from '@angular/router';
import { HeroView } from './hero-view/hero-view';
import { CreateHero } from './create-hero/create-hero';
import { AuthGuard } from './guards/auth-guard';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'heroes', component: HeroView },
  { path: 'createHero', component: CreateHero, canActivate: [AuthGuard], data: {role: "ADMIN"} },
  { path: 'login', component: Login},
  { path: 'register', component: Register}
];
