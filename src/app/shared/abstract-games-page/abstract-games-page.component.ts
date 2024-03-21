import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs';
import { GameSearchService } from 'src/app/core/services/common/game-search.service';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { GameListComponent } from '../game-list/game-list.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { SearchFilters } from 'src/app/core/models/search-filters';

@Component({
  selector: 'app-abstract-games-page',
  templateUrl: './abstract-games-page.component.html',
  styleUrls: ['./abstract-games-page.component.scss'],
  imports: [GameListComponent, CommonModule, SpinnerComponent],
  standalone: true,
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export abstract class AbstractGamesPageComponent implements OnInit{

  //**  aplicamos el inject para pasar el constructor al super de games-page  */
  private readonly gamesSearchService: GameSearchService = inject(GameSearchService);
  private readonly destroy$: AutoDestroyService = inject(AutoDestroyService);


  $games = this.gamesSearchService.$games;
  // * recibimos el signal
  $loading: Signal<boolean> = this.gamesSearchService.$loading;

  searchFilters: SearchFilters = {
    search: '',
    page_size: 50,
    // ordening: '-released',
    // metacritic: '80,100'
  }

  constructor(){} // lo llamamos por private readonly

  // * nos suscribimos al evento del query
  ngOnInit(): void {
    this.gamesSearchService.queryString$.pipe(
      // * utilizamos el tap
      tap((query: string) => this.searchFilters.search = query),
      debounceTime(500),
      distinctUntilChanged(),
      // * para definir el tap aca con this.searchFilters
      switchMap((title: string) => this.gamesSearchService.searchGames(this.searchFilters)),
      takeUntil(this.destroy$)).subscribe((data) => this.gamesSearchService.setGames(data.results))
    // this.gamesSearchService.searchGames().pipe
    // (takeUntil(this.destroy$)).subscribe((data) => {
    //   // console.log(data);
    //   this.gamesSearchService.setGames(data.results)
    // })
  }
}
