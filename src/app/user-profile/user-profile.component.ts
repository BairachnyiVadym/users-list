import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersService } from '../services/users.service';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  id: string;
  user = {} as UserInterface;
  userRegTime;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params.id;
    });

    this.subscription = this.usersService.passUserSubject
      .subscribe((user: UserInterface) => {
        this.user = user;
        this.transformRegDate(this.user.registered);
      });

    this.getUser();
  }

  getUser() {
    this.usersService.getUserFromStorage(this.id);
  }

  transformRegDate(date: string) {
    const preparedDateStr = date.replace(/\s+/, '');
    this.userRegTime = new Date(preparedDateStr);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
