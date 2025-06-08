import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formRegister !: FormGroup;
  members: any[] = [];

  constructor(private router: Router) {
    this.formRegister = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: [this.passwordMatchValidator, this.UserValidator] });

    const stored = sessionStorage.getItem('member');
    if (stored) {
      this.members = JSON.parse(stored);
    }
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (password === confirm) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  UserValidator(group: AbstractControl): ValidationErrors | null {
    const username = group.get('username')?.value;
    const password = group.get('password')?.value;
    const stored = sessionStorage.getItem('member');

    if (stored) {
      const members = JSON.parse(stored);
      let found = false;
      for (const user of members) {
        if (user.username === username) {
          found = true;
          break;
        }
      }

      if (found) {
        console.log('ชื่อผู้ใช้นี้มีอยู่แล้ว');
        return { userExists: true };
      } else {
        return null;
      }
    }
    return null;
  }

  onSubmit(): void {
    console.log('ข้อมูลที่กรอก:', this.formRegister);
    console.log('ค่าของข้อมูลที่กรอก:', this.formRegister.value);
    if (this.formRegister.valid) {
      this.saveData();
      this.formRegister.reset();
      this.router.navigate(['/login']);
    } else {
      console.log('ฟอร์มไม่ถูกต้อง');
      this.formRegister.markAllAsTouched();
    }
  }

  saveData() {
    let formData = this.formRegister.value;
    console.log('formData: ', formData);
    // sessionStorage.setItem('userData', JSON.stringify(formData));
    this.members.push(formData);
    sessionStorage.setItem('member', JSON.stringify(this.members));
  }

  // getDataSession() {
  //   let userData = sessionStorage.getItem('member');
  //   if (userData) {
  //     let userDataObj = JSON.parse(userData);
  //     console.log('member: ', userDataObj);
  //   } else {
  //     console.log('No user data found in localStorage.');
  //   }
  // }

  get f() {
    return this.formRegister.controls;
  }
}
