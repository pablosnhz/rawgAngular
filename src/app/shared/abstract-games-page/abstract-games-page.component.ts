import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal, TemplateRef, inject } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, merge, switchMap, takeUntil, tap } from 'rxjs';
import { GameSearchService } from 'src/app/core/services/common/game-search.service';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { GameListComponent } from '../game-list/game-list.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { AbstractGamesPageParams } from 'src/app/core/models/abstract-games-page-params';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-abstract-games-page',
  templateUrl: './abstract-games-page.component.html',
  styleUrls: ['./abstract-games-page.component.scss'],
  imports: [GameListComponent, CommonModule, SpinnerComponent, NgTemplateOutlet, ReactiveFormsModule],
  standalone: true,
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class AbstractGamesPageComponent implements OnInit{

  //**  aplicamos el inject para pasar el constructor al super de games-page  */
  private readonly gamesSearchService: GameSearchService = inject(GameSearchService);
  private readonly destroy$: AutoDestroyService = inject(AutoDestroyService);

  private readonly fb: FormBuilder = inject(FormBuilder)
  onFilterChange$: Subject<SearchFilters> = new Subject<SearchFilters>();
  // orderPreference: string = 'Relevance';
  form: FormGroup;

  $games = this.gamesSearchService.$games;
  // * recibimos el signal
  $loading: Signal<boolean> = this.gamesSearchService.$loading;

  defaultSearchFilter: SearchFilters = {
    search: '',
    page_size: 50,
    // ordering: '-released',
    // metacritic: '80,100'
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
    if(this.componentParams.showFilters){
      this.initForm();
    }
    this.subscribeToFilterChange();
    this.subscribeToQueryChanges();
  }


  initForm(): void {
    this.form = this.fb.group({
      order: ['-relevance'],
      platform: []
    });
    this.subcribeToFormChanges();
  }

  // de este modo traemos los filtros
  subscribeToFilterChange(): void {
    this.onFilterChange$
    .pipe(
      switchMap((filters: SearchFilters) =>
        this.gamesSearchService.searchGames(filters)),
      takeUntil(this.destroy$))
      .subscribe((data) => this.gamesSearchService.setGames(data.results))
  }

  subscribeToQueryChanges():void {
    this.gamesSearchService.queryString$
    .pipe(takeUntil(this.destroy$))
    .subscribe((query: string)=>{
      this.onFilterChange$.next({ ...this.defaultSearchFilter, search: query })
    })
  }

  subcribeToFormChanges(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(()=>{
      const ordering = this.form.controls['order'].value;
      const platform = this.form.controls['platform'].value;
      // console.log(order, platform);
      // al usar el break point vemos si pide los datos de los juegos para los filtros
      this.onFilterChange$.next({ ...this.defaultSearchFilter, ordering, platform })

    })
  }


}
