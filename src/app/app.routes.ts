import { Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';

import {
    redirectUnauthorizedTo,
    canActivate,
    redirectLoggedInTo,
  } from '@angular/fire/auth-guard';
  
  const redirectUnauthorizedToLogin = () =>
    redirectUnauthorizedTo(['/login']); //if not logged in, redirect to login page
  const redirectLoggedInToHome = () => redirectLoggedInTo(['/register']); //if logged in, redirect to tabs page
  

export const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            {
                path: '', component: HomeComponent
            },
            {
                path:'register',
                loadComponent: () => import('./core/auth/register/register.component').then(m => m.RegisterComponent),

            },
            {
                path:'login',
                loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent),

            },
            {
                path:'inscription',
                loadComponent: () => import('./core/layout/inscription-form/inscription-form.component').then(m => m.InscriptionFormComponent),

            },
        ],
    },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];