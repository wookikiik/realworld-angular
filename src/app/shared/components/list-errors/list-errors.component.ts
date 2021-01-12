import { Component, Input, OnInit } from '@angular/core';
import { Errors } from 'src/app/core/models';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html',
})
export class ListErrorsComponent implements OnInit {
  errorList: string[];

  @Input()
  set error(error: Errors) {
    this.errorList = Object.keys(error.errors).reduce((errors, filed) => {
      errors.push(`${filed} ${error.errors[filed]}`);
      return errors;
    }, []);
  }

  ngOnInit(): void {}
}
