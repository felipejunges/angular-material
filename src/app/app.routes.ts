import { Routes } from '@angular/router';
import { TesteComponent } from './pages/teste/teste.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'login', component: LoginComponent },

    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },

    { path: 'teste', component: TesteComponent, canActivate: [AuthGuard] },

    { path: '**', component: NotFoundComponent }
];
