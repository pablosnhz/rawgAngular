import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { Observable, delay, finalize, map, of, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Genre, GenresResult } from 'src/app/core/models/genres';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  public $genres: WritableSignal<Genre[]> = signal([]);
  public $loading: WritableSignal<boolean> = signal(false);

  constructor( private httpClient: HttpClient ) { }

  getGenres(): Observable<Genre[]> {
    this.$loading.set(false);
    if(this.$genres().length > 0){
      return of(this.$genres())
    }
    return this.httpClient
    .get<GenresResult>(`${environment.BASE_API_URL}genres`)
    .pipe(
      // delay aplicado para el initializer
      // delay(2000),
      tap((result) => this.$genres.set(result.results)),
      map((result) => result.results),
      finalize(() => this.$loading.set(false))
    )
  }


  // getGenres(): Observable<GenresResult> {
  //   return this.httpClient.get<GenresResult>(`${environment.BASE_API_URL}genres`)
  // }

  // setGenres(genre: Genre[]):void {
  //   this.$genres.set(genre)
  // }
}
