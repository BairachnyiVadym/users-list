import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  usersList: UserInterface[];
  subscription: Subscription;
  modalOpen = false;

  constructor(private usersService: UsersService,
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
    this.usersService.loadUsers().subscribe();
  }

  onUserDelete(index: number) {
    this.usersList.splice(index, 1);
    this.usersService.updateUsersInStorage(this.usersList).subscribe();
  }

  onEmitUser(userObj: UserInterface) {
    this.usersList.push(userObj);
    this.usersService.updateUsersInStorage(this.usersList).subscribe();
    this.modalOpen = false;
  }

  onNavigate(id: string) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  onModalOpen() {
    this.modalOpen = true;
  }

  onModalClose() {
    this.modalOpen = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
