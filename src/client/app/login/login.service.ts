import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router }    from '@angular/router';
import { LoginResponse } from '../Classes/LoginResponse';

@Injectable()
export class LoginService {
  constructor(private router: Router) {
  }

  Login(data: LoginResponse): void {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.User));

    this.stateChange.emit(true);
    this.router.navigate(['/']);
  }

  Logout(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    this.stateChange.emit(false);
    this.router.navigate(['/login']);
  }

  isLogedIn(): boolean {
    var access_token = localStorage.getItem("access_token");

    try {
      var user = JSON.parse(localStorage.getItem("user"));
    } catch (ex) { //if user is not valid json
      return false;
    }

    if (!access_token || !user) return false;
    if (typeof (access_token) != "string") return false;
    if (typeof (user) != "object") return false;
    return true;
  }

  stateChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isloggedIn = this.loginService.isLogedIn();

    if (!isloggedIn)
      this.router.navigate(['/login']);

    return isloggedIn;
  }
}

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isloggedIn = this.loginService.isLogedIn();

    if (isloggedIn)
      this.router.navigate(['/home']);
    // this.router.navigate(['/']); //The appropriate redirect is THIS. but for some reason it will display an empty white screen if i use that.....

    return !isloggedIn;
  }
}
