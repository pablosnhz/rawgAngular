import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, TemplateRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AbstractGamesPageParams } from 'src/app/core/models/abstract-games-page-params';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { AbstractGamesPageComponent } from 'src/app/shared/abstract-games-page/abstract-games-page.component';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-new-games-page',
  // templateUrl: './games-page.component.html',
  templateUrl: '../../../../../shared/abstract-games-page/abstract-games-page.component.html',
  // imports: [JsonPipe],
  standalone: true,
  imports: [GameListComponent, CommonModule, SpinnerComponent, NgTemplateOutlet, ReactiveFormsModule, InfiniteScrollModule],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGamesPageComponent extends AbstractGamesPageComponent{

  override defaultSearchFilter: SearchFilters = {
    ...this.defaultSearchFilter,
    ordering: '-released',
    metacritic: '80,100'
  };

  override componentParams: AbstractGamesPageParams = {
    title: 'New and trending',
    subtitle: 'Based on player counts and release date',
    showFilters: false
  };

  constructor(){
    super();
  };
}
