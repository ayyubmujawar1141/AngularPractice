import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Dashboard } from './dashboard/dashboard';
import { TblLogin} from './tbl-login/tbl-login';
export const routes: Routes = [
    {
        path: 'login',
        component : Login
    },
    {
        path: 'signup',
        component : Signup
    },
    {
        path: 'dashboard',
        component : Dashboard
    },
    {
        path: 'tbl-login',
        component : TblLogin
    }
];
