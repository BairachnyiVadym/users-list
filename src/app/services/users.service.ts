import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersDataUrl = 'assets/users.json';

  constructor(private http: HttpClient) { }

  getUsersData() {
    return this.http.get<UserInterface[]>(this.usersDataUrl);
  }
}
