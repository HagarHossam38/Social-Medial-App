import { Routes, CanActivateFn } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { profile } from 'console';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './core/layouts/default-layout/default-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { authGuard } from './core/guards/auth/auth-guard';
import { noAuthGuard } from './core/guards/noAuth/no-auth-guard';
import path from 'path';
import { Component } from '@angular/core';
import { PostDetailsComponent } from './features/post-details/post-details.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AuthLayoutComponent, canActivate: [noAuthGuard],
        children: [
            { path: 'login', component: LoginComponent, title: "Sign in | RouteH" },
            { path: 'register', component: RegisterComponent, title: "Create account | RouteH" },
        ]
    },
    {
        path: '', component: DefaultLayoutComponent, canActivate: [authGuard]
        , children: [
            { path: 'home', component: HomeComponent, title: "Home Feed | RouteH Posts" },
            { path: 'post-details/:id', component: PostDetailsComponent, title: "Home post Details | RouteH Posts" },
            { path: 'profile', component: ProfileComponent, title: "Profile | RouteH Posts" },
            { path: 'notifications', component: NotificationsComponent, title: "Route | Notifications" },
            { path: 'settings', component: SettingsComponent, title: "Settings | Change Password" },
        ]
    },
    { path: '**', component: NotFoundComponent }
];
