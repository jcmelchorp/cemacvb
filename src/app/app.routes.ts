import { Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { authGuard, publicGuard } from './core/auth/guards/auth.guard';
import { NotFoundComponent } from './core/layout/not-found/not-found.component';
import { LandingComponent } from './core/layout/landing/landing.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { LoginComponent } from './core/auth/login/login.component';
import { FaqComponent } from './core/layout/faq/faq.component';
import { InscriptionFormComponent } from './core/layout/inscription-form/inscription-form.component';
import { AboutComponent } from './core/layout/about/about.component';
import { SettingsComponent } from './core/layout/settings/settings.component';
import { TermsComponent } from './core/layout/terms/terms.component';
import { PrivacyPolicyComponent } from './core/layout/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        // loadComponent: () => import('./core/layout/landing/landing.component').then(m => m.LandingComponent)
        component: LandingComponent,
      },
      {
        path: 'auth',
        children: [
          {
            path: 'register',
            canActivate: [authGuard],
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
        canActivate: [publicGuard],
        component: LoginComponent,
      },
      {
        path: 'config',
        canActivate: [authGuard],
        component: SettingsComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'home',
        canActivate: [authGuard],
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'terms',
        component: TermsComponent,
      },
      {
        path: 'privacy',
        component: PrivacyPolicyComponent,
      },
      {
        path: '404',
        component: NotFoundComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
