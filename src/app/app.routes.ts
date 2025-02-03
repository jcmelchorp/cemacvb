import { Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';

import {
    redirectUnauthorizedTo,
    canActivate,
    redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { authGuard, publicGuard } from './core/auth/guards/auth.guard';
import { NotFoundComponent } from './core/layout/not-found/not-found.component';
import { LandingComponent } from './core/layout/landing/landing.component';




export const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            {
                path: '',
                // loadComponent: () => import('./core/layout/landing/landing.component').then(m => m.LandingComponent)
                component:LandingComponent
            },
            {
                path: 'auth',
                canActivate: [publicGuard],
                children: [
                    {
                        path: 'register',
                        loadComponent: () => import('./core/auth/register/register.component').then(m => m.RegisterComponent),
        
                    },
                    {
                        path: 'login',
                        loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent),
        
                    },
                ],
            },
            {
                path: 'inscription',
                canActivate: [publicGuard],
                loadComponent: () => import('./core/layout/inscription-form/inscription-form.component').then(m => m.InscriptionFormComponent),

            },
            {
                path: 'faq',
                canActivate: [publicGuard],
                loadComponent: () => import('./core/layout/faq/faq.component').then(m => m.FaqComponent),

            },
            {
                path: 'home',
                canActivate: [authGuard],
                loadComponent: () => import('./core/layout/home/home.component').then(m => m.HomeComponent),

            },
            {
                path: 'about',
                canActivate: [publicGuard],
                loadComponent: () => import('./core/layout/about/about.component').then(m => m.AboutComponent),
            },
        ],
    },
    {
        path: '404',
        component: NotFoundComponent,
      },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];