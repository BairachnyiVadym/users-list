import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StorageModule } from '@ngx-pwa/local-storage';
import { SharedModule } from '../shared/shared.module';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAddComponent } from './components/user-add/user-add.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserProfileComponent,
    UserAddComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StorageModule.forRoot({ IDBNoWrap: true }),
    SharedModule
  ]
})
export class UserModule { }
