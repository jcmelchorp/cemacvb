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
import { RegisterComponent } from './core/auth/register/register.component';
import { LoginComponent } from './core/auth/login/login.component';
import { FaqComponent } from './core/layout/faq/faq.component';
import { InscriptionFormComponent } from './core/layout/inscription-form/inscription-form.component';
import { AboutComponent } from './core/layout/about/about.component';




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
                        component: RegisterComponent,
        
                    },
                ],
            },
            {
                path: 'inscription',
                canActivate: [publicGuard],
                component: InscriptionFormComponent,

            },
            {
                path: 'login',
                component: LoginComponent,

            },
            {
                path: 'faq',
                canActivate: [publicGuard],
                component: FaqComponent,

            },
            {
                path: 'home',
                canActivate: [authGuard],
                component: HomeComponent,

            },
            {
                path: 'about',
                canActivate: [publicGuard],
                component: AboutComponent,
            },
        ],
    },
    {
        path: '404',
        component: NotFoundComponent,
      },
    { path: '**', redirectTo: '/404', pathMatch: 'full' }
];