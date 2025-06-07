import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin !: FormGroup;

  constructor() {
    this.formLogin = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

  }

  usernamePasswordCheckMatch(): void {
    const username = this.formLogin.get('username')?.value;
    const password = this.formLogin.get('password')?.value;
    const stored = sessionStorage.getItem('member');

    if (stored) {
      const members = JSON.parse(stored);
      let found = false;
      for (const user of members) {
        if (user.username === username && user.password === password) {
          found = true;
          break;
        }
      }

      if (found) {
        console.log('เข้าสู่ระบบสำเร็จ');
      } else {
        console.log('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } else {
      console.log('ไม่มีข้อมูลผู้ใช้ในระบบ');
    }
  }

  onSubmit(): void {
    console.log('ข้อมูลที่กรอก:', this.formLogin);
    console.log('ค่าของข้อมูลที่กรอก:', this.formLogin.value);
    this.usernamePasswordCheckMatch();
    if (this.formLogin.valid) {
      this.formLogin.reset();
    } else {
      //console.log('ฟอร์มไม่ถูกต้อง');
      this.formLogin.markAllAsTouched();
    }
  }

  get f() {
    return this.formLogin.controls;
  }
}
