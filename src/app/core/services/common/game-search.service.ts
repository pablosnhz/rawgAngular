import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Game, SearchResult } from 'src/app/core/models/game';
import { SearchFilters } from '../../models/search-filters';

@Injectable({
  providedIn: 'root'
})
export class GameSearchService {

  // creamos un signal
  $games: WritableSignal<Game[]> = signal([]);

  // * spinner como signal
  public $loading: WritableSignal<boolean> = signal(false);

  $searchQuery: WritableSignal<string> = signal('');
  private queryString: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public queryString$ = this.queryString.asObservable();

  public nextUlr: string = '';

  constructor( private HttpClient: HttpClient ) { }

  // * mediante el params hacemos la busqueda del inputSearch en el mainLayout
  searchGames(filters: SearchFilters): Observable<SearchResult>{
    this.$loading.set(true)
    if(this.nextUlr){
      return this.HttpClient
        .get<SearchResult>(this.nextUlr)
        .pipe(finalize(() => this.$loading.set(false)));
    }
    const params = new HttpParams( {
      fromObject: { ...filters } })
    return this.HttpClient
      .get<SearchResult>(environment.BASE_API_URL + 'games', {params})
    // para el loading
          // .pipe(finalize(() => this.$loading.set(false)))
  }

  // aplico el signal aca
  setGames(games: Game[]): void {
    this.$loading.set(true);
    // update para recibir actualizaciones mediante el uso del infiinite scroll
    this.$games.update((values: Game[])=> {
      return [...values, ...games]
    })
    console.log(this.$games())
  }

  setNextUrl(nextUrl: string): void {
    this.nextUlr = nextUrl
  }

  setQueryString(queryString: string): void {
    this.$loading.set(false);
    this.queryString.next(queryString);
  }
}
