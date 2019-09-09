import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/user-list', pathMatch: 'full'},
  { path: 'user-list', component: UserListComponent },
  { path: 'user-list/:id', component: UserProfileComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
