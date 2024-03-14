import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GameDetailComponent } from './routes/pages/games-page/pages/game-detail/game-detail.component';

@NgModule({
  declarations: [
    AppComponent,
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
