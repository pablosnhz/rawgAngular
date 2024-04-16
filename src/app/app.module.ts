import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GenrePageComponent } from './routes/pages/games-page/pages/genre-page/genre-page.component';
import { log } from 'firebase-functions/logger';

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
    // [provideRouter([
    //   { component: GenrePageComponent, path: 'test'},
    // ], withComponentInputBinding())],
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
