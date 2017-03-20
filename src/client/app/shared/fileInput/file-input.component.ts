import { Component, ViewContainerRef, Input, forwardRef  } from '@angular/core';
import { FormBuilder, Validators, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR   } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'file-input',
  templateUrl: 'file-input.component.html',
  styleUrls: ['file-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true
    }
  ]
})

export class FileInputComponent implements ControlValueAccessor {
  constructor() {
  }

  writeValue(value: any) {
    if (value) {
      this.files = value;
    }
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  @Input()
  formControlName: string = "";

  @Input()
  placeholder: string = "";

  files: FileList = null;
  fileNames: string = "";

  filesChanged(event: Event, el: any): void {
    let fileNamesArray: string[] = [];
    for (let i = 0; i < el.files.length; i++) {
      fileNamesArray.push(el.files[i].name);
    }
    this.files = el.files;
    if (fileNamesArray.length == 0)
      this.fileNames = "";
    else
      this.fileNames = fileNamesArray.reduce(function(acc: any, name: any) { return acc + "," + name; });
    this.propagateChange(this.files);
  }
}
