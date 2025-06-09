import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = sessionStorage.getItem('currentUser');

  if (!currentUser) {
    console.log('No user logged in. Redirecting to login page.');
    router.navigate(['/login']);
    return false; // Prevent access to routes if not authenticated
  }else{
    const role = JSON.parse(currentUser)[0].role;

    if (role === 'admin') {
      return true;
    } else{
      // Admin can access all routes
      router.navigate(['/profile']);
      return false;
    } 
  }
};
