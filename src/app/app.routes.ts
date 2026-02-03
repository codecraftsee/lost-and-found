import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home'),
  },
  {
    path: 'items',
    loadComponent: () => import('./item-list/item-list'),
  },
  {
    path: 'items/:id',
    loadComponent: () => import('./item-detail/item-detail'),
  },
  {
    path: 'report',
    loadComponent: () => import('./report-item/report-item'),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
