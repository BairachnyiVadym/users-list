import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() usersList: UserInterface[];

  constructor() { }

  ngOnInit() {
  }

  onUserDelete(index: number) {
    this.usersList.splice(index, 1);
  }

}
