
import { Routes, withComponentInputBinding } from "@angular/router";
import { MainLayoutComponent } from "./core/main-layout/main-layout.component";
import { GAME_LIST_ROUTES } from "./routes/pages/games-page/pages/game-list.routes";
import { AuthLayoutComponent } from "./core/layout/auth-layout/auth-layout.component";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./routes/pages/games-page/pages/game-list.routes').then((r) => r.GAME_LIST_ROUTES)
      },
      {
        path: 'user',
        canActivate: [authGuard],
        loadChildren: () =>
        import('./routes/pages/games-page/user/user.routes').then((r) => r.USER_ROUTES)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./routes/pages/games-page/auth/auth.routes').then((r) => r.AUTH_ROUTES)
      },
      {
        path: '**',
        redirectTo: '',
      }
    ],
  },
  {
    path: '**',
    redirectTo: '',
  }
];
