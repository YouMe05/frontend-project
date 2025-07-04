import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = sessionStorage.getItem('currentUser');

  if (currentUser) {
    const role = JSON.parse(currentUser)[0].role;
    const targetUrl = state.url;
    if (targetUrl === '/manage-user' && role !== 'admin') {
      //ถ้าไม่ใช่ admin
      const backUrl = document.referrer || '/profile'; // ถ้าไม่มี referrer ให้ fallback เป็น '/profile'
      router.navigateByUrl(backUrl);
      return false;
    }

    if (targetUrl === '/profile' && role !== 'user') {
      //ถ้าไม่ใช่ user
      const backUrl = document.referrer || '/manage-user';
      router.navigateByUrl(backUrl);
      return false;
    }

    // ได้รับอนุญาต
    return true;
  } else {
    console.log('Not logged in. Redirecting to login page.');
    //alert('Please log in to access this page.');
    router.navigate(['/login']);
    return false;
  }
};
