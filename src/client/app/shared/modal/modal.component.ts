import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.css'],
})
export class ModalComponent {
  constructor() {
  }
  Options = {
    top: '100px'
  }
}

export let DialogOptions = {
  position: {
    top: '100px'
  }
}
