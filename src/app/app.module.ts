import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { RouteReuseStrategyChange } from './core/models/route-reuse-strategy';
import { GenreService } from './routes/pages/games-page/services/genre.service';

import { firstValueFrom } from 'rxjs';
import { AuthService } from './core/services/common/auth.service';
import { UserLibraryComponent } from './routes/pages/games-page/user/components/user-library/user-library.component';

function init(genreService: GenreService) {
  return () =>  firstValueFrom(genreService.getGenres());
}

function initUser(authService: AuthService) {
  return () =>  firstValueFrom(authService.getUserFromStorage());
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,


    RouterModule.forRoot(routes, { bindToComponentInputs: true }),
  ],
  // para el uso standalone http
  providers: [
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseStrategyChange
    },
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [GenreService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initUser,
      deps: [AuthService],
      multi: true,
    },
    // [provideRouter([
    //   { component: GenrePageComponent, path: 'test'},
    // ], withComponentInputBinding())],
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
