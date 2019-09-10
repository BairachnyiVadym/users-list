import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UsersService } from '../services/users.service';
import { UserInterface } from '../interfaces/user.interface';

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
    this.getUser();
  }

  getUser() {
    this.usersService.getUsersFromStorage().subscribe((users: UserInterface[]) => {
      this.user = users.find((userObj: UserInterface) => {
        return userObj._id === this.id;
      });
      this.transformRegDate(this.user.registered);
      console.log(this.user);
    });
  }

  transformRegDate(date: string) {
    const preparedDateStr = date.replace(/\s+/, '');
    this.userRegTime = new Date(preparedDateStr);
  }

}
