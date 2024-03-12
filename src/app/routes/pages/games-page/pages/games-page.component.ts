import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { takeUntil } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { GameSearchService } from 'src/app/routes/pages/games-page/services/game-search.service';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
  // imports: [JsonPipe],
  standalone: true,
  imports: [GameListComponent],
  providers: [RouterOutlet, AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesPageComponent implements OnInit{

  $games = this.gamesSearchService.$games;

  constructor( private gamesSearchService: GameSearchService, private destroy$: AutoDestroyService ){}

  ngOnInit(): void {
    this.gamesSearchService.searchGames().pipe
    (takeUntil(this.destroy$)).subscribe((data) => {
      // console.log(data);
      this.gamesSearchService.setGames(data.results)
    })
  }
}
