import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageMap } from '@ngx-pwa/local-storage'; // any storage observable autocompletes!
import { Observable, Subject } from 'rxjs';
import { filter, flatMap, switchMap } from 'rxjs/operators';

import { UserInterface } from '../models/user.interface';
import { AppConstants } from '../../app.constans';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersDataUrl = 'assets/users.json';
  passUsersSubject = new Subject<UserInterface[]>();

  constructor(private http: HttpClient, private storage: StorageMap) { }

  loadUsers() {
    let hasCollFlag;
    return this.storage.has(AppConstants.storageKey).pipe( // though used switchMap operator for demo purposes
      switchMap((presenceInStorage) => {
        hasCollFlag = presenceInStorage;
        return presenceInStorage ? this.getUsersFromStorage() : this.getUsersDataFromJSON();
      })
    ).pipe(
      switchMap((data: UserInterface[]) => {
        this.passUsersSubject.next(data);
        return hasCollFlag ? new Observable() : this.storage.set(AppConstants.storageKey, data);
      })
    );
  }

  getUsersDataFromJSON(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(this.usersDataUrl);
  }

  getUsersFromStorage() {
    return this.storage.get(AppConstants.storageKey);
  }

  getUserFromStorage(id: string): Observable<UserInterface> {
    return this.getUsersFromStorage().pipe(
      flatMap((data: UserInterface[]) => data),
      filter((user: UserInterface) => user._id === id)
    );
  }

  updateUsersInStorage(value) {
    return this.storage.set(AppConstants.storageKey, value);
  }
}
