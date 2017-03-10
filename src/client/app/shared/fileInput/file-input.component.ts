import { Component, ViewContainerRef } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'file-input',
  templateUrl: 'file-input.component.html',
  styleUrls: ['file-input.component.css']
})
export class FileInputComponent {
  constructor() {
  }

  filesChanged(event: Event, el: any): void {
    debugger;
  }
}
