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
        path: 'report/:id',
        loadComponent: () => import('./Views/report-detail/report-detail.component').then(m => m.ReportDetailComponent)
    },

    {
        path: 'report/edit/:id',
        loadComponent: () => import('./Views/report-edit/report-edit.component').then(m => m.ReportEditComponent)
    },

    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }

];
