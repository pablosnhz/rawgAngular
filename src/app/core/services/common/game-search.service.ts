import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Game, SearchResult } from 'src/app/core/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameSearchService {

  // creamos un signal
  $games: WritableSignal<Game[]> = signal([]);


  $searchQuery: WritableSignal<string> = signal('');
  private queryString: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public queryString$ = this.queryString.asObservable();

  constructor( private HttpClient: HttpClient ) { }

  // * mediante el params hacemos la busqueda del inputSearch en el mainLayout
  searchGames(title: string): Observable<SearchResult>{
    const params = new HttpParams( { fromObject: { search: title } })
    return this.HttpClient.get<SearchResult>(environment.BASE_API_URL + 'games', {params})
  }

  // aplico el signal aca
  setGames(games: Game[]): void {
    this.$games.set(games);
  }

  setQueryString(queryString: string): void {
    this.queryString.next(queryString);
  }
}
