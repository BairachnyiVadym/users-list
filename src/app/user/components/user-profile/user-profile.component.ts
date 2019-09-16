import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  id: string;
  user = {} as UserInterface;
  userRegTime;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params.id;
    });

    this.getUser(this.id);
  }

  getUser(id: string) {
    this.usersService.getUserFromStorage(id)
      .subscribe((user: UserInterface) => {
        this.user = user;
        this.user.picture = 'http://placehold.it/140';
        this.transformRegDate(this.user.registered);
      });
  }

  transformRegDate(date: string) {
    const preparedDateStr = date.replace(/\s+/, '');
    this.userRegTime = new Date(preparedDateStr);
  }
}
