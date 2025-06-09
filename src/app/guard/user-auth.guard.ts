import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const currentUser = sessionStorage.getItem('currentUser');

  if (!currentUser) {
    console.log('No user logged in. Redirecting to login page.');
    router.navigate(['/login']);
    return false; // Prevent access to routes if not authenticated
  }else{
    const role = JSON.parse(currentUser)[0].role;

    if (role === 'user') {
      // Admin can access all routes
      return true;
    } else {
      // Non-admin users are not allowed
      router.navigate(['/manage-user']);
      return false;
    }
  }
};
