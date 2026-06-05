import { Routes } from '@angular/router';
import { Login } from './screens/login/login';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        loadComponent: () => import('./screens/register/register').then(r => r.Register)
    },
    {
        path: '',
        loadComponent: () => import('./screens/today/today').then(t => t.Today)
    },
    {
        path: 'my-profile',
        loadComponent: () => import('./screens/my-profile/my-profile').then(m => m.MyProfile)
    }
];
