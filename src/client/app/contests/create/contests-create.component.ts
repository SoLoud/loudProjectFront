import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { MdDialog } from '@angular/material';

import { HttpErrorHandlerService } from '../../shared/Services/HttpErrorHandler.service';
import { LoginService } from '../../login/login.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Contest, ContestCategories } from '../../Classes/Contest';

@Component({
  moduleId: module.id,
  selector: 'contests-create',
  templateUrl: 'contests-create.component.html',
  styleUrls: ['contests-create.component.css']
})
export class ContestsCreateComponent {
  constructor(public dialog: MdDialog, public fb: FormBuilder, private http: Http, private httpErrService: HttpErrorHandlerService, public toastr: ToastsManager, vcr: ViewContainerRef, private loginService: LoginService) {
  }

  contest: Contest = new Contest();

  categories = ContestCategories;

  public createContestForm = this.fb.group({
    title: ["", [Validators.required]],
    endDate: ["", Validators.required],
    description: [""],
    category: [""],
    requiredHashTags: [""],
    optionalHashTags: [""],
    productPhotos: [""],
  });

  private extractData(res: Response): Contest {
    let resObj = res.json();

    return new Contest(resObj);
  }

  potato(event: any) {
    var files = event.srcElement.files;
    console.log(files);
  }

  createContest(): void /*: Observable<Response>*/ {
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

// @Component({
//   selector: 'potatoman',
//   templateUrl: './contests-create.component.html',
// })
// export class DialogResultExampleDialog {
//   constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) { }
// }
