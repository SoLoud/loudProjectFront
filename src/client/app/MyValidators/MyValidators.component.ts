import { FormControl } from '@angular/forms'

export class MyValidators {
  static isEmail(c: FormControl) {
    var EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (c.value != "" && (c.value.length <= 5 || !EMAIL_REGEXP.test(c.value))) {
      return { "incorrectMailFormat": true };
    }

    return null;
  }
}
