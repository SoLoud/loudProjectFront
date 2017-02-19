import { Component, ViewContainerRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { HttpErrorHandlerService } from '../../shared/Services/HttpErrorHandler.service';
import { LoginService } from '../../login/login.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Contest } from '../../Classes/Contest';

@Component({
  moduleId: module.id,
  selector: 'contests-list',
  templateUrl: 'contests-list.component.html',
  styleUrls: ['contests-list.component.css']
})
export class ContestsCreateComponent {
  constructor(private http: Http, private httpErrService: HttpErrorHandlerService, public toastr: ToastsManager, vcr: ViewContainerRef, private loginService: LoginService) {
  }

  contest: Contest = new Contest();

  private extractData(res: Response): Contest {
    let resObj = res.json();

    return new Contest(resObj);
  }

  createContests(): void /*: Observable<Response>*/ {
    var headers = new Headers({ "Content-Type": "application/json" });
    var headers = new Headers({ "Authorization": "Bearer " + this.loginService.getAccessToken() });
    var requestOption = new RequestOptions({ headers: headers });

    //TODO: take api url from enviroment config
    this.http.post("http://localhost:55741/api/Contests", requestOption)
      .catch(er => this.httpErrService.handleError(er, this.toastr))
      .map(this.extractData)
      .subscribe(data => {
        this.contest = data;
        this.toastr.success("Contest Created");
       });
  }
}
