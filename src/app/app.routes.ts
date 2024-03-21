
import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./core/main-layout/main-layout.component";
import { GAME_LIST_ROUTES } from "./routes/pages/games-page/game-list.routes";

export const routes: Routes = [
  // {
  //   path: '',
  //   component: MainLayoutComponent,
  //   children: [...GAME_LIST_ROUTES]
  // },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./routes/pages/games-page/game-list.routes').then((r) => r.GAME_LIST_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
