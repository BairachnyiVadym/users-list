import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserInterface } from '../../models/user.interface';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  addUserForm: FormGroup;
  newUser: UserInterface;
  @Output() emitUser: EventEmitter<UserInterface> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      balance: ['$', [Validators.required, Validators.minLength(2)]],
      age: [null, Validators.required],
      about: [null, Validators.required],
      tags: this.formBuilder.array([ this.createInitialTag() ])
    });
  }

  createInitialTag(): FormControl {
    return this.formBuilder.control('new user', Validators.required);
  }

  onAddTag() {
    const control = this.formBuilder.control(null, Validators.required);
    const tagsFormArray = this.addUserForm.get('tags') as FormArray;
    tagsFormArray.push(control);
  }

  getTags() {
    const tagsFormArray = this.addUserForm.get('tags') as FormArray;
    return tagsFormArray.controls;
  }

  onSubmit() {
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
