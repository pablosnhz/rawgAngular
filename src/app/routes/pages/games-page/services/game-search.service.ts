import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Game, SearchResult } from 'src/app/core/models/game';

@Injectable({
  providedIn: 'root'
})
export class GameSearchService {

  // creamos un signal
  $games: WritableSignal<Game[]> = signal([]);

  constructor( private HttpClient: HttpClient ) { }

  searchGames(): Observable<SearchResult>{
    return this.HttpClient.get<SearchResult>(environment.BASE_API_URL + 'games')
  }

  // aplico el signal aca
  setGames(games: Game[]): void {
    this.$games.set(games);
  }
}
