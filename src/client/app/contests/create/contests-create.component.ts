import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { MdDialog } from '@angular/material';

import { HttpErrorHandlerService } from '../../shared/Services/HttpErrorHandler.service';
import { LoginService } from '../../login/login.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Contest, ContestCategories } from '../../Classes/Contest';
import { SoloudFile } from '../../Classes/SoloudFile';
import { Photo } from '../../Classes/Photo';

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
    description: "",
    category: "",
    requiredHashTags: [""],
    optionalHashTags: [""],
    productPhotos: [""],
    examplePhotos: [""],
  });

  private Uint8ArrayToArray(data: Uint8Array): number[]{
    let returnValue: number[] = [];

    data.forEach((value: number) => {
      returnValue.push(value);
    });

    return returnValue;
  }

  private toSoloudFile(file: File): Promise<SoloudFile> {
    var returnValue = new SoloudFile();
    returnValue.fileName = file.name;
    returnValue.contentType = file.type;

    var reader = new FileReader();
    var rejector: (reason?: any) => void;
    var resolver: (value?: {} | PromiseLike<{}>) => void;

    var promise = new Promise<SoloudFile>(function(resolve, reject) {
      rejector = reject;
      resolver = resolve;
    });

    reader.readAsArrayBuffer(file);
    reader.onload = (event) => {
      var bytes = new Uint8Array(reader.result);
      returnValue.content = this.Uint8ArrayToArray(bytes);
      resolver(returnValue);
      reader.abort();
    };
    reader.onerror = function(event) {
      rejector("Reading from file failed");
      reader.abort();
    }

    return promise;
  }

  private toSoloudFiles(fileList: FileList): Promise<SoloudFile[]> {
    var promiseArray: Promise<SoloudFile>[] = [];

    for (let i = 0; i < fileList.length; i++) {
      var file = fileList[i];
      promiseArray.push(this.toSoloudFile(file));
    }

    return Promise.all(promiseArray);
  }

  private get formContest(): Promise<Contest> {
    var rejector: (reason?: any) => void;
    var resolver: (value?: Contest | PromiseLike<Contest>) => void;
    var promise = new Promise<Contest>(function(resolve, reject) { rejector = reject; resolver = resolve; });

    let returnValue = new Contest();
    returnValue.title = this.createContestForm.controls["title"].value;
    returnValue.endingAt = this.createContestForm.controls["endDate"].value;
    returnValue.description = this.createContestForm.controls["description"].value;
    returnValue.category = this.createContestForm.controls["category"].value.Name;
    returnValue.requiredHashTags = this.createContestForm.controls["requiredHashTags"].value.reduce((acc: string, val: string) => {return acc + "," + val});
    returnValue.optionalHashTags = this.createContestForm.controls["optionalHashTags"].value.reduce((acc: string, val: string) => {return acc + "," + val});

    let prom1 = this.toSoloudFiles(this.createContestForm.controls["productPhotos"].value).then(function(productPhotos: SoloudFile[]) {
      returnValue.productPhotos = <Photo[]>productPhotos;
    });
    let prom2 = this.toSoloudFiles(this.createContestForm.controls["examplePhotos"].value).then(function(examplePhotos: SoloudFile[]) {
      returnValue.examplePhotos = <Photo[]>examplePhotos;
    });

    Promise.all([prom1, prom2]).then(function() {
      resolver(returnValue);
    }, function(er) {
      rejector(er);
    });

    return promise;
  }

  private extractData(res: Response): Contest {
    let resObj = res.json();

    return new Contest(resObj);
  }

  public createContest(): void {
    var headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.loginService.getAccessToken()
    });
    var requestOption = new RequestOptions({ headers: headers });

    this.formContest.then((contest) => {
      // var p = new Photo();
      // p.fileName = "gamiese";
      // p.contentType = "image/jpg";
      // p.content = new [12,52,126];
      // var asda = new Contest();
      // asda.title = "potato";
      // asda.endingAt = new Date();
      // asda.requiredHashTags = "hash1,sha622";
      // asda.productPhotos = [p];
      //TODO: take api url from enviroment config
      this.http.post("http://localhost:55741/api/Contests", contest, requestOption)
        .catch(er => this.httpErrService.handleError(er, this.toastr))
        .map(this.extractData)
        .subscribe(data => {
          this.contest = data;
          this.toastr.success("Contest Created");
        });
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
