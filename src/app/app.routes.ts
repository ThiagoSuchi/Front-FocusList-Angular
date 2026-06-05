import { Routes } from '@angular/router';
import { Login } from './screens/login/login';

export const routes: Routes = [
    // Rotas sem sidebar
    { path: 'login', component: Login },
    { path: 'register', loadComponent: () => import('./screens/register/register').then(r => r.Register) },

    // Rotas com sidebar
    {
        path: '',
        loadComponent: () => import('./components/shared/page/page').then(m => m.Page),
        children: [
            { path: '', loadComponent: () => import('./screens/today/today').then(m => m.Today) },
            { path: 'my-profile', loadComponent: () => import('./screens/my-profile/my-profile').then(m => m.MyProfile) }
        ]
    },
];
