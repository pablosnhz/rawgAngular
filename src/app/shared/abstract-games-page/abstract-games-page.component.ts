import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal, TemplateRef, inject } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, exhaustMap, merge, switchMap, takeUntil, tap } from 'rxjs';
import { GameSearchService } from 'src/app/core/services/common/game-search.service';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { GameListComponent } from '../game-list/game-list.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { AbstractGamesPageParams } from 'src/app/core/models/abstract-games-page-params';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GenreService } from 'src/app/routes/pages/games-page/services/genre.service';
import { Genre, GenresResult } from 'src/app/core/models/genres';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Game, SearchResult } from 'src/app/core/models/game';


@Component({
  selector: 'app-abstract-games-page',
  templateUrl: './abstract-games-page.component.html',
  imports: [GameListComponent, CommonModule, SpinnerComponent, NgTemplateOutlet, ReactiveFormsModule, InfiniteScrollModule],
  standalone: true,
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class AbstractGamesPageComponent implements OnInit{

  //**  aplicamos el inject para pasar el constructor al super de games-page  */
  private readonly gamesSearchService: GameSearchService = inject(GameSearchService);
  private readonly destroy$: AutoDestroyService = inject(AutoDestroyService);

  private readonly fb: FormBuilder = inject(FormBuilder)
  // orderPreference: string = 'Relevance';
  form: FormGroup;

  private readonly genresService: GenreService = inject(GenreService);
  $genres: Signal<Genre[]> = this.genresService.$genres;

  scrolled$: Subject<void> = new Subject<void>();
  filters$: BehaviorSubject<SearchFilters>;

  $games = this.gamesSearchService.$games;
  // * recibimos el signal
  $loading: Signal<boolean> = this.gamesSearchService.$loading;

  defaultSearchFilter: SearchFilters = {
    search: '',
    page_size: 50,
    // ordering: '-released',
    // metacritic: '80,100',
    genres: '',
  }

  componentParams: AbstractGamesPageParams = {
    title: 'Please provide a title',
    showFilters: true,
  }


  constructor(){} // lo llamamos por private readonly

  // * nos suscribimos al evento del query
  ngOnInit(): void {
    // aplicamos el merge para la busqueda por filtros del select y lo pasamos a subscribeToFilterChange
    // this.gamesSearchService.queryString$

    // merge(this.gamesSearchService.queryString$, this.onFilterChange$)
  //   .pipe(
  //     switchMap(() => this.gamesSearchService.searchGames(this.searchFilters)),
  //     takeUntil(this.destroy$)).subscribe((data) => this.gamesSearchService.setGames(data.results))
    // * primer code
  // this.gamesSearchService.searchGames().pipe
    // (takeUntil(this.destroy$)).subscribe((data) => {
    //   // console.log(data);
    //   this.gamesSearchService.setGames(data.results)
    // })
    // * inicializamos el filtro refactorizado
    this.filters$ = new BehaviorSubject<SearchFilters>({
      ...this.defaultSearchFilter
    });
    if(this.componentParams.showFilters){
      this.initForm();
    }
    this.getGenres();
    this.subscribeToFilterChange();
    this.subscribeToQueryChanges();
    this.subscribeInfiniteScroll();
  }


  initForm(): void {
    this.form = this.fb.group({
      order: ['-relevance'],
      genres: ['']
    });
    // iniciamos el formChanges aca para la busqueda por parametros
    this.subcribeToFormChanges();
  }

  // de este modo traemos los filtros
  subscribeToFilterChange(): void {
    this.filters$
    .pipe(
      tap(() => this.$games.set([])),
      switchMap((filters: SearchFilters) =>
        this.gamesSearchService.searchGames(filters)),
      takeUntil(this.destroy$))
      .subscribe((data: SearchResult) => {
        this.$games.set(data.results)
      }
    )
  }

  subscribeInfiniteScroll(): void {
    this.scrolled$
    .pipe(
      exhaustMap(() => {
        return this.gamesSearchService.nextPageScroll()
      }),
      takeUntil(this.destroy$)
    ).subscribe((data: SearchResult) => {
      this.$games.update((values: Game[]) => {
        return [...values, ...data.results]
      })
    })
  }

  subscribeToQueryChanges():void {
    this.gamesSearchService.queryString$
    .pipe(takeUntil(this.destroy$))
    .subscribe((query: string)=>{
      this.filters$.next({ ...this.defaultSearchFilter, search: query })
    })
  }

  subcribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(()=>{
      const ordering = this.form.controls['order'].value;
      const genres = this.form.controls['genres'].value;
      // console.log(order, platform);
      // al usar el break point vemos si pide los datos de los juegos para los filtros
      this.filters$.next({ ...this.defaultSearchFilter, ordering, genres })

    })
  }

  // funcion genre
  getGenres():void {
    this.genresService.getGenres().pipe(takeUntil(this.destroy$)).subscribe((genres: GenresResult) => {
      this.genresService.setGenres(genres.results);
    })
  }


}
