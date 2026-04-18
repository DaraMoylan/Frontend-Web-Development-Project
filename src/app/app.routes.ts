import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'book-detail/:id',
    loadComponent: () => import('./pages/book-detail/book-detail.page').then( m => m.BookDetailPage)
  },
  {
    path: 'reading-list',
    loadComponent: () => import('./pages/reading-list/reading-list.page').then( m => m.ReadingListPage)
  },
];
