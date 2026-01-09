import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { LocalStorageService } from '../service/local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private storage: LocalStorageService) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(route);
  }

  private checkAuth(route: ActivatedRouteSnapshot): boolean {
    console.log("Guard Auth Key:"+ this.authService.getToken());

    if(!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data?.['role'];

    if(requiredRole === "ADMIN" && !this.storage.isAdmin()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

};
