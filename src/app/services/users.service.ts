import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage';

import { UserInterface } from '../interfaces/user.interface';
import { AppConstants } from '../app.constans';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersDataUrl = 'assets/users.json';

  constructor(private http: HttpClient, private storage: StorageMap) { }

  getUsersData() {
    return this.http.get<UserInterface[]>(this.usersDataUrl);
  }

  setUsersToStorage() {
    this.storage.has(AppConstants.storageKey)
      .subscribe((presenceInStorage: boolean) => {
        if (!presenceInStorage) {
          this.getUsersData()
            .subscribe((data: UserInterface[]) => {
              this.storage.set(AppConstants.storageKey, data).subscribe();
            });
        }
      });
  }

  getUsersFromStorage() {
    return this.storage.get(AppConstants.storageKey);
  }

  updateUsersInStorage(value) {
    this.storage.set(AppConstants.storageKey, value).subscribe();
  }
}
