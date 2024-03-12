import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GameListComponent } from './shared/game-list/game-list.component';
import { GameCardComponent } from './shared/game-card/game-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    // GameListComponent,
    // GameCardComponent,
  ],
  imports: [
    // CommonModule,
    BrowserModule,

    // importo el http
    HttpClientModule,

    RouterModule.forRoot(routes),
  ],
  // para el uso standalone http
  providers: [
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }

],
  bootstrap: [AppComponent],
})
export class AppModule { }
