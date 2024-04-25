import { Routes } from "@angular/router";
import { ProfilePageComponent } from "../user/pages/profile-page/profile-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { authGuard } from "src/app/core/guards/auth.guard";
import { nouserGuard } from "src/app/core/guards/nouser.guard";

export const AUTH_ROUTES : Routes = [
  {
    path: '',
    canActivate: [nouserGuard],
    component: LoginPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]
