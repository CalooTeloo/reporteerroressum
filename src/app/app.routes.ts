import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./Views/report-add/report-add.component').then(m => m.ReportAddComponent)
    },

    {
        path: 'report-list',
        loadComponent: () => import('./Views/report-list/report-list.component').then(m => m.ReportListComponent)
    },

    {
        path: 'reports/:id',
        loadComponent: () => import('./Views/report-detail/report-detail.component').then(m => m.ReportDetailComponent)
    },

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }

];
