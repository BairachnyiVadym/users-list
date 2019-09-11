import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { repeat } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import { ModalService } from '../_modal';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  usersList: UserInterface[];

  constructor(private usersService: UsersService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getUsersFromStorage()
      .pipe(repeat(4))
      .subscribe((data: UserInterface[]) => {
        this.usersList = data;
      });
  }

  onUserDelete(index: number) {
    this.usersList.splice(index, 1);
    this.usersService.updateUsersInStorage(this.usersList);
  }

  onClick(id: string) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
