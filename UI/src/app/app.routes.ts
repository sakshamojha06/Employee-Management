import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AddEmployee } from './components/add-employee/add-employee';
import { EditEmployee } from './components/edit-employee/edit-employee';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'add',
        component: AddEmployee
    },
    {
        path: 'edit/:id',
        component: EditEmployee
    },
    {
        path: '**',
        redirectTo: ''
    }
];
