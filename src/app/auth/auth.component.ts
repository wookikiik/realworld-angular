import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authType: string;
  title: string;
  errors: Array<string>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((segment) => {
      this.authType = segment[segment.length - 1].path;
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
    });
  }
}
