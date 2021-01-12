import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser //
      .pipe(filter((user) => user != null))
      .subscribe((user) => {
        this.currentUser = user;
      });
  }
}
