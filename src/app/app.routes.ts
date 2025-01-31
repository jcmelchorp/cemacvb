import { Routes } from '@angular/router';
import { HomeComponent } from './core/layout/home/home.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';

export const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            { 
                path: '', component: HomeComponent 
            },
        ]
        // loadComponent: () => import('./features/wordlists/wordlists.component'),
    },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];