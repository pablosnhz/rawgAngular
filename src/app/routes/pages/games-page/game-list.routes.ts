import { Routes } from "@angular/router";

export const gameListRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/games-page.component').then((m) => m.GamesPageComponent)
  }
];
