import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';

import { UserInterface } from '../interfaces/user.interface';
import { AppConstants } from '../app.constans';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  id: string;
  user: UserInterface;

  constructor(private route: ActivatedRoute, private storage: StorageMap) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = params.id;
        this.storage.get(AppConstants.storageKey).subscribe((data: UserInterface[]) => {
          this.user = data.find((userObj) => {
            return userObj._id === this.id;
          });
          console.log(this.user);
        });
    });
  }

}
