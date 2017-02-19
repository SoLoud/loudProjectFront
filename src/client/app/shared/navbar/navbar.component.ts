import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../login/login.service';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})
export class NavbarComponent {
  constructor(public loginService: LoginService) {
    this.loginService.stateChange.subscribe((newLoginState: boolean) => {
      this.isLogedIn = newLoginState;
    });
  }

  logout(): void {
    this.loginService.Logout();
  }

  isLogedIn: boolean = this.loginService.isLogedIn();
}
