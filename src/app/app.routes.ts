import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Dashboard } from './components/dashboard/dashboard';
import { TblLogin} from './components/tbl-login/tbl-login';
import { OtpService} from './components/otp-service/otp-service'
import { NewPwd } from './components/new-pwd/new-pwd';
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
    },
    {
        path: 'otp-service',
        component: OtpService
    },
    {
        path: 'new-pwd',
        component: NewPwd
    }
];
