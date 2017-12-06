import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { HomeComponent } from './components/home/home.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { PublishedFormComponent } from './components/published-form/published-form.component';
import { MyFormsComponent } from './components/my-forms/my-forms.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotFoundComponent } from './components/fragments/not-found/not-found.component';
import { Authentication } from './services/_auth/authentication';

export const HomeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'create-form',
        component: CreateFormComponent,
    },
    {
        path: 'my-forms',
        component: MyFormsComponent,
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
    }
];

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login-register',
        pathMatch: 'full'
    },
    {
        path: 'login-register',
        component: LoginRegisterComponent,
    },
    {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'form/:id',
        component: PublishedFormComponent,
    },
    {
        path: 'form',
        component: PublishedFormComponent,
    },
    {
        path: 'page-not-found',
        component: NotFoundComponent,
    },
    {
        path: '',
        canActivate: [Authentication],
        data: { title: 'Secure Views' },
        children: HomeRoutes
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
