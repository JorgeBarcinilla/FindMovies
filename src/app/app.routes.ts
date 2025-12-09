import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  },
  {
    loadComponent: () => import('./pages/details/details').then((m) => m.DetailsComponent),
    path: 'details/:type/:id'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
