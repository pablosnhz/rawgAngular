import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { Genre } from 'src/app/core/models/genres';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  genres: WritableSignal<Genre[]> = signal([]);

  constructor( private httpClient: HttpClient ) { }


  getGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(`${environment.BASE_API_URL}genres`)
  }
}
