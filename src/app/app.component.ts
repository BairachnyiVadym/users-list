import { Component, OnInit } from '@angular/core';

import { StorageMap } from '@ngx-pwa/local-storage';
import { UsersService } from './services/users.service';
import { UserInterface } from './interfaces/user.interface';

import { AppConstants } from './app.constans';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private usersService: UsersService, private storage: StorageMap) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.storage.has(AppConstants.storageKey)
      .subscribe((presenceInStorage) => {
        if (!presenceInStorage) {
          this.usersService.getUsersData()
            .subscribe((data: UserInterface[]) => {
              this.storage.set(AppConstants.storageKey, data).subscribe();
            });
        }
    });
  }
}
