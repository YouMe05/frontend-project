import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  imports: [],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.scss'
})
export class ManageUserComponent {
  userList: any[] = [];
  userdetail = { username: '', email: '', firstname: '', lastname: '' , telephone: '' };

  constructor(private router: Router) {
    this.loadUsers();
    console.log('ผู้ใช้ทั้งหมด:', this.userList);
    
  }

  loadUsers(): void {
    const stored = sessionStorage.getItem('member');
    if (stored) {
      this.userList = JSON.parse(stored);
    } else {
      console.log('ไม่มีข้อมูลผู้ใช้ในระบบ');
    }
  }

  deleteUser(index: number): void {
    if(confirm('Do you want to delete the user?')) {
      this.userList.splice(index, 1);
      sessionStorage.setItem('member', JSON.stringify(this.userList));
      this.loadUsers();
    }
    
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
