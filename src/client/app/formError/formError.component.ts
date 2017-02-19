import { Component, trigger, state, animate, transition, style } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'form-error',
  templateUrl: 'formError.component.html',
  styleUrls: ['formError.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ height: 0 }),
        animate('200ms ease-in', style({ height: '*' }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate('200ms ease-out', style({ height: '*' })),
        style({ height: 0 })
      ])
    ])
  ]
})
export class FormErrorComponent {
  public shrinkOut() {

  }
}
