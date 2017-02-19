import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MyValidators } from '../MyValidators/MyValidators.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LoginResponse } from '../Classes/LoginResponse';
import { User } from '../Classes/User';

import { HttpErrorHandlerService } from '../shared/Services/HttpErrorHandler.service';
import { LoginService } from './login.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  constructor(public fb: FormBuilder, public toastr: ToastsManager, vcr: ViewContainerRef,
              private http: Http, private loginService: LoginService, private httpErrService: HttpErrorHandlerService) {
    // Use with angular v2.2 or above
    this.toastr.setRootViewContainerRef(vcr);
  }

  public loginForm = this.fb.group({
    email: ["", [Validators.required, MyValidators.isEmail]],
    password: ["", Validators.required]
  });

  private makeEqual(a: any, b: any) {
    for (var prop in b)
      if (a.hasOwnProperty(prop))
        a[prop] = b[prop];
  }

  private extractData(res: Response) {
    let resObj = res.json();
    let loginResp = new LoginResponse();

    for (var prop in resObj)
      if (loginResp.hasOwnProperty(prop))
        if (prop == "User") {
          loginResp[prop] = new User();

          var b = JSON.parse(resObj[prop]);
          for (var prope in b)
            if (loginResp["User"].hasOwnProperty(prope))
              loginResp["User"][prope] = b[prope];
        }
        else if (prop == ".issued" || prop == ".expires") {
          loginResp[prop] = new Date(resObj[prop]);
        }
        else
          loginResp[prop] = resObj[prop];

    var test = new TestTwo<LoginResponse>(LoginResponse).getNew();

    return loginResp;
  }

  doLogin(event: Event, email: string, password: string) /*: Observable<Response>*/ {
    //We need to add body like this if we want Content-Type to be se to form-urlencoded and we want that or else the API will not respond
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('username', email);
    urlSearchParams.append('password', password);
    let body = urlSearchParams.toString();

    var headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
    var requestOption = new RequestOptions({ headers: headers });

    //TODO: take api url from enviroment config
    return this.http.post("http://localhost:55741/Token", body, requestOption)
      .catch(er => this.httpErrService.handleError(er, this.toastr))
      .map(this.extractData)
      .subscribe((data) => {
        this.loginService.Login(data);
      });
  }
}

//imba class constructor
class TestTwo<T> {
  constructor(private testType: any) {
  }

  getNew(): T {
    return new this.testType();
  }
}
