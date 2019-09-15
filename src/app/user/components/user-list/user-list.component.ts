import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { ModalService } from '../../../_modal';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  usersList: UserInterface[];
  subscription: Subscription;

  constructor(private usersService: UsersService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.usersService.passUsersSubject
      .subscribe((users: UserInterface[]) => {
        this.usersList = users;
      });

    this.loadUsers();
  }

  loadUsers() {
    this.usersService.loadUsers();
  }

  onUserDelete(index: number) {
    this.usersList.splice(index, 1);
    this.usersService.updateUsersInStorage(this.usersList);
  }

  onEmitUser(userObj: UserInterface) {
    this.usersList.push(userObj);
    this.usersService.updateUsersInStorage(this.usersList);
  }

  onNavigate(id: string) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
