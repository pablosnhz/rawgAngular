import { Routes } from "@angular/router";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

export const AUTH_ROUTES : Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]
