import { Routes, withComponentInputBinding } from "@angular/router";
import { GameIdResolver } from "src/app/core/resolvers/game-id.resolver";
import { GameDetailComponent } from "./pages/game-detail/game-detail.component";
import { GamesPageComponent } from "./pages/game-page/games-page.component";
import { NewGamesPageComponent } from "./pages/new-games-page/new-games-page.component";
import { GenrePageComponent } from "./pages/genre-page/genre-page.component";
import { GenresPageComponent } from "./pages/genres-page/genres-page.component";

export const GAME_LIST_ROUTES: Routes = [
  {
    path: '',
    component: NewGamesPageComponent
  },
  {
    path: 'games',
    component: GamesPageComponent
  },
  {
    path: 'games/:id',
    component: GameDetailComponent,
    resolve: {
        game: GameIdResolver
    },
  },
  {
    path: 'genre/:genre',
    component: GenrePageComponent,
    data: {
      doNotReuse: true,
    }
  },
  {
    path: 'genres',
    component: GenresPageComponent
  }
]
;
