import { Component, Input, OnInit } from '@angular/core';
import { Errors } from '../../models';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
})
export class ListErrorsComponent implements OnInit {
  formattedErrors = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = [];
    if (errorList.errors !== undefined) {
      for (const field of Object.keys(errorList.errors)) {
        this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
      }
    }
  }

  get errorList(): Array<string> {
    return this.formattedErrors;
  }

  constructor() {}

  ngOnInit(): void {}
}
