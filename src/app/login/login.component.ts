import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import md5 from 'md5';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin !: FormGroup;
  currentUser: any[] = [];
  adminUser = { username: 'admin', password: 'admin' , role : 'admin' }; // ข้อมูลผู้ดูแลระบบ

  constructor(private router: Router) {
    this.formLogin = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      }
    );
    this.adminUser.password = md5(this.adminUser.password); // เข้ารหัสรหัสผ่านผู้ดูแลระบบด้วย md5
    sessionStorage.setItem('admin', JSON.stringify(this.adminUser));

  }

  usernamePasswordCheckMatch(): void {
    const username = this.formLogin.get('username')?.value;
    const password = md5(this.formLogin.get('password')?.value); // ใช้ md5 เข้ารหัสรหัสผ่าน
    this.currentUser = []; // ล้าง currentUser ก่อน
    const stored = sessionStorage.getItem('member');
    const adminStored = sessionStorage.getItem('admin');

    
    if (stored || adminStored) {
      console.log('มีข้อมูลผู้ใช้ในระบบ');
      const members = stored ? JSON.parse(stored) : [];
      let found = false;
      if (username === this.adminUser.username && password === this.adminUser.password) {
        this.currentUser.push(this.adminUser);
        sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        console.log('เข้าสู่ระบบสำเร็จในฐานะผู้ดูแลระบบ');
        this.router.navigate(['/manage-user']);
        return;
      }else{
        for (const user of members) {
          if (user.username === username && user.password === password) {
            this.currentUser.push(user);
            sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            found = true;
            break;
          }
        }
      }
    
      if (found) {
        console.log('เข้าสู่ระบบสำเร็จ');
        this.router.navigate(['/profile']);
      } else {
        console.log('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        alert('Username or password is incorrect.');
        this.formLogin.reset();
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
