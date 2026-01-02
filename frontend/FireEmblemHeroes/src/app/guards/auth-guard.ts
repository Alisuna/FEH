import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../service/local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LocalStorageService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(route);
  }

  private checkAuth(route: ActivatedRouteSnapshot): boolean {
    console.log("Guard Auth Key::"+ this.authService.get('auth-key'));

    if(!this.authService.isLoggedInSignal()) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data?.['role'];

    if(requiredRole === "ADMIN" && !this.authService.isAdmin()) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }

};
