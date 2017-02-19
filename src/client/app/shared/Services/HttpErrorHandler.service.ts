import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class HttpErrorHandlerService {
  handleError(error: Response | any, toastr?: ToastsManager) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    let err;
    if (error instanceof Response) {
      const body = error.json() || '';
      err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    if(toastr != null)
      toastr.warning(this.errorTexts[err]);


    return Observable.throw(errMsg);
  }

  private errorTexts: { [id: string]: string } = {
    "10001": "Wrong Email/Password combination",
    "10002": "Email is not confirmed. A confirmation email has been sent to your email. Confirm your account and try again."
  }
}
