import { Routes } from '@angular/router';
import { Login } from './screens/login/login';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    // ** nested routes (rotas aninhadas) **

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },

    // Rotas sem sidebar
    { path: 'login', component: Login },
    { path: 'register', loadComponent: () => import('./screens/register/register').then(r => r.Register) },

    // Rotas com sidebar
    {
        path: '',
        loadComponent: () => import('./components/shared/page/page').then(m => m.Page),
        children: [
            { path: 'home', loadComponent: () => import('./screens/today/today').then(m => m.Today), canActivate: [authGuard] },
            { path: 'my-profile', loadComponent: () => import('./screens/my-profile/my-profile').then(m => m.MyProfile), canActivate: [authGuard] }
        ]
    },

    { path: '**', redirectTo: 'home' }
];
