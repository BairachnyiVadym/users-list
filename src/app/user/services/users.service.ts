import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subject } from 'rxjs';

import { UserInterface } from '../models/user.interface';
import { AppConstants } from '../../app.constans';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersDataUrl = 'assets/users.json';
  passUsersSubject = new Subject<UserInterface[]>();
  passUserSubject = new Subject<UserInterface>();

  constructor(private http: HttpClient, private storage: StorageMap) { }

  getUsersData() {
    return this.http.get<UserInterface[]>(this.usersDataUrl);
  }

  loadUsers() {
    this.storage.has(AppConstants.storageKey)
      .subscribe((presenceInStorage: boolean) => {
        if (!presenceInStorage) {
          this.getUsersData()
            .subscribe((data: UserInterface[]) => {
              this.passUsersSubject.next(data);
              this.storage.set(AppConstants.storageKey, data).subscribe();
            });
        } else {
          this.storage.get(AppConstants.storageKey)
            .subscribe((data: UserInterface[]) => {
              this.passUsersSubject.next(data);
            });
        }
      });
  }

  getUserFromStorage(id) {
    this.storage.get(AppConstants.storageKey)
      .subscribe((data: UserInterface[]) => {
        const user = data.find((userObj: UserInterface) => {
          return userObj._id === id;
        });
        this.passUserSubject.next(user);
      });
  }

  updateUsersInStorage(value) {
    this.storage.set(AppConstants.storageKey, value).subscribe();
  }
}
