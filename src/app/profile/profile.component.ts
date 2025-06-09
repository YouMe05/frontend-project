import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

currentuserinfo = {username: '', email: '', firstname: '', lastname: '', telephone: '', role: ''};

constructor(private router: Router){
  this.profile();
}

  profile(){
    const userstored = sessionStorage.getItem('currentUser');

    if (userstored) {
      const userArray = JSON.parse(userstored);
    
      if (Array.isArray(userArray) && userArray.length > 0) {
        const userinfo = userArray[0];
        this.currentuserinfo.username = userinfo.username;
        this.currentuserinfo.email = userinfo.email ;
        this.currentuserinfo.firstname = userinfo.firstname;
        this.currentuserinfo.lastname = userinfo.lastname;
        this.currentuserinfo.telephone = userinfo.telephone;
        this.currentuserinfo.role = userinfo.role || 'user'; // กำหนดค่า role เป็น 'user' ถ้าไม่มีข้อมูล
        console.log('userinfo:', userinfo);
        console.log('ข้อมูลผู้ใช้ปัจจุบัน:', this.currentuserinfo);
      }
    }
    else {
      console.log('ไม่มีข้อมูลผู้ใช้ในระบบ');
      
    }

  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    console.log('ออกจากระบบสำเร็จ');
    this.router.navigate(['/login']);
  }
}
