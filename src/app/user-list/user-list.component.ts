import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { repeat } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import { ModalService } from '../_modal';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  usersList: UserInterface[];
  addUserForm: FormGroup;
  newUser: UserInterface;

  constructor(private usersService: UsersService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUsers();

    this.addUserForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'balance': new FormControl('$', Validators.required),
      'age': new FormControl(null, Validators.required),
      'about': new FormControl(null, Validators.required),
      'tags': new FormArray([
        new FormControl('new user')
      ])
    });
  }

  getUsers() {
    this.usersService.getUsersFromStorage()
      .pipe(repeat(4))
      .subscribe((data: UserInterface[]) => {
        this.usersList = data;
        console.log(this.usersList);
      });
  }

  onUserDelete(index: number) {
    this.usersList.splice(index, 1);
    this.usersService.updateUsersInStorage(this.usersList);
  }

  onUserAdd(userObj: UserInterface) {
    this.usersList.push(userObj);
    this.usersService.updateUsersInStorage(this.usersList);
  }

  onNavigate(id: string) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onAddTag() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.addUserForm.get('tags')).push(control);
  }

  getTags() {
    return (<FormArray>this.addUserForm.get('tags')).controls;
  }

  onSubmit() {
    this.closeModal('add-user-modal');

    this.newUser = {
      _id: Date.now().toString(),
      guid: '',
      isActive:  Math.random() > 0.5,
      balance: this.addUserForm.value.balance,
      picture: 'http://placehold.it/32x32',
      age: this.addUserForm.value.age,
      eyeColor: '',
      name: this.addUserForm.value.username,
      gender: '',
      company: '',
      email: this.addUserForm.value.email,
      phone: this.addUserForm.value.phone,
      address: this.addUserForm.value.address,
      about: this.addUserForm.value.about,
      registered: new Date(Date.now()).toISOString(),
      latitude: null,
      longitude: null,
      tags: this.addUserForm.value.tags
    };

    this.onUserAdd(this.newUser);

    this.addUserForm.reset();
  }

}
