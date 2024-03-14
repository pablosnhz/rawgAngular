import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';
import { GameSearchService } from 'src/app/core/services/common/game-search.service';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
  // imports: [JsonPipe],
  standalone: true,
  imports: [GameListComponent],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesPageComponent implements OnInit{

  $games = this.gamesSearchService.$games;

  constructor( private gamesSearchService: GameSearchService, private destroy$: AutoDestroyService ){}

  // * nos suscribimos al evento del query
  ngOnInit(): void {
    this.gamesSearchService.queryString$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((title: string) => this.gamesSearchService.searchGames(title)),
      takeUntil(this.destroy$)).subscribe((data) => this.gamesSearchService.setGames(data.results))
    // this.gamesSearchService.searchGames().pipe
    // (takeUntil(this.destroy$)).subscribe((data) => {
    //   // console.log(data);
    //   this.gamesSearchService.setGames(data.results)
    // })
  }
}
