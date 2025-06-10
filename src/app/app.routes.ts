import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { nonAuthGuard } from './guards/non-auth.guard';
import { userAuthGuard } from './guards/user-auth.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
        canActivate: [nonAuthGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
        canActivate: [nonAuthGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [userAuthGuard]
    },
    {
        path: 'manage-user',
        loadComponent: () => import('./manage-user/manage-user.component').then(m => m.ManageUserComponent),
        canActivate: [adminAuthGuard]
    }
];
