import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StorageModule } from '@ngx-pwa/local-storage';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { ModalComponent } from '../shared/modal/modal.component';

@NgModule({
  declarations: [
    UserListComponent,
    UserProfileComponent,
    UserAddComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StorageModule.forRoot({ IDBNoWrap: true })
  ]
})
export class UserModule { }
