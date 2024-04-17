import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Genre, GenresResult } from 'src/app/core/models/genres';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  public $genres: WritableSignal<Genre[]> = signal([]);

  constructor( private httpClient: HttpClient ) { }

  getGenres(): Observable<Genre[]> {
    if(this.$genres().length > 0){
      return of(this.$genres())
    }
    return this.httpClient
    .get<GenresResult>(`${environment.BASE_API_URL}genres`)
    .pipe(
      tap((result) => this.$genres.set(result.results)),
      map((result) => result.results)
    )
  }


  // getGenres(): Observable<GenresResult> {
  //   return this.httpClient.get<GenresResult>(`${environment.BASE_API_URL}genres`)
  // }

  // setGenres(genre: Genre[]):void {
  //   this.$genres.set(genre)
  // }
}
