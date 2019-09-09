import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { UserInterface } from '../interfaces/user.interface';
import { repeat } from 'rxjs/operators';

import { AppConstants } from '../app.constans';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  usersList: UserInterface[];

  constructor(private storage: StorageMap) { }

  ngOnInit() {
    this.storage.get(AppConstants.storageKey)
      .pipe(repeat(3))
      .subscribe((data: UserInterface[]) => {
        this.usersList = data;
      });
  }

  onUserDelete(index: number) {
    this.usersList.splice(index, 1);
    this.storage.set(AppConstants.storageKey, this.usersList).subscribe();
  }

}
