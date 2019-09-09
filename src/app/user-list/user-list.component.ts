import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { repeat } from 'rxjs/operators';

import { UserInterface } from '../interfaces/user.interface';
import { AppConstants } from '../app.constans';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  usersList: UserInterface[];

  constructor(private storage: StorageMap, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.storage.get(AppConstants.storageKey)
      .pipe(repeat(4))
      .subscribe((data: UserInterface[]) => {
        this.usersList = data;
        console.log(this.usersList);
      });
  }

  onUserDelete(index: number) {
    this.usersList.splice(index, 1);
    this.storage.set(AppConstants.storageKey, this.usersList).subscribe();
  }

  onClick(id: string) {
    this.router.navigate([id], {relativeTo: this.route});
  }

}
