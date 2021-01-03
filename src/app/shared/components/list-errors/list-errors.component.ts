import { Component, Input } from '@angular/core';
import { Errors } from 'src/app/core/models';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html',
})
export class ListErrorsComponent {
  formatedErrors: Array<string>;

  @Input()
  set error(errors: Errors) {
    this.formatedErrors = Object.keys(errors.errors || {}).map(
      (key) => `${key} ${errors.errors[key]}`
    );
  }
}
