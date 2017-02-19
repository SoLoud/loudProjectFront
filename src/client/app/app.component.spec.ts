import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import {
  async
} from '@angular/core/testing';
import {
  Route
} from '@angular/router';
import {
  RouterTestingModule
} from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormErrorComponent } from './formError/formError.component';
import { AboutComponent } from './about/about.component';
import { ContestsComponent } from './contests/contests.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { LoginService } from './login/login.service';

import {} from 'jasmine'

export function main() {

  describe('App component', () => {

    let config: Route[] = [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent }
    ];
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes(config)],
        declarations: [TestComponent, ToolbarComponent,
          NavbarComponent, AppComponent, ContestsComponent,
          HomeComponent, AboutComponent, LoginComponent, FormErrorComponent],
        providers: [
          { provide: APP_BASE_HREF, useValue: '/' }, LoginService
        ]
      });
    });

    it('should build without a problem',
      async(() => {
        TestBed
          .compileComponents()
          .then(() => {
            let fixture = TestBed.createComponent(TestComponent);
            let compiled = fixture.nativeElement;

            expect(compiled).toBeTruthy();
          });
      }));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-app></sd-app>'
})

class TestComponent {
}
