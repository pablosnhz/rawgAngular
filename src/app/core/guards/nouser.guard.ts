
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/common/auth.service";

@Injectable({
  providedIn: 'root'
})

export class nouserGuard implements CanActivate {

constructor(private authService: AuthService, private router: Router) {}

canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){

    if(this.authService.$user()) {
      return this.router.parseUrl('/user');
    } else {
      return true;
    }
  }
}
