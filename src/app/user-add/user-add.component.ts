import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../_modal';

import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  addUserForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    balance: new FormControl('$', [Validators.required, Validators.minLength(2)]),
    age: new FormControl(null, Validators.required),
    about: new FormControl(null, Validators.required),
    tags: new FormArray([
      new FormControl('new user')
    ])
  });
  newUser: UserInterface;
  @Output() emitUser: EventEmitter<UserInterface> = new EventEmitter();

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  onAddTag() {
    const control = new FormControl(null, Validators.required);
    const tagsFormArray = this.addUserForm.get('tags') as FormArray;
    tagsFormArray.push(control);
  }

  getTags() {
    const tagsFormArray = this.addUserForm.get('tags') as FormArray;
    return tagsFormArray.controls;
  }

  closeModal(id: string) {
    this.modalService.close(id);
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

    this.emitUser.emit(this.newUser);

    this.addUserForm.reset();
  }

}
