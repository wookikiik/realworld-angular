import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from '../../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private userService: UserService) {}

  currentUser: User;

  ngOnInit(): void {
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
    });
  }
}
