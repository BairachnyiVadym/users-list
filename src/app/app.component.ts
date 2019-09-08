import { Component, OnInit } from '@angular/core';

import { UsersService } from './services/users.service';
import { UserInterface } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: UserInterface[];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsersData()
      .subscribe((data: UserInterface[]) => {
        this.users = data;
      }, error => {
        console.log('Error: ' + error);
      });
  }
}
