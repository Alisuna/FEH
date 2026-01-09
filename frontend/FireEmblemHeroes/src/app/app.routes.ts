import { Routes } from '@angular/router';
import { HeroView } from './hero-view/hero-view';
import { CreateHero } from './create-hero/create-hero';
import { AuthGuard } from './guards/auth-guard';
import { Login } from './login/login';
import { Register } from './register/register';
import { UserEdit } from './user-edit/user-edit';
import { UserResolver } from './resolver/user-resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'heroes', component: HeroView },
  { path: 'createHero', component: CreateHero, canActivate: [AuthGuard], data: {role: "ADMIN"}},
  { path: 'login', component: Login},
  { path: 'register', component: Register},
  { path: 'userEdit', component: UserEdit, canActivate: [AuthGuard], data: {role: "ADMIN"}, resolve: {usersData: UserResolver}}
];
