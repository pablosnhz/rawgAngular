import { ChangeDetectionStrategy, Component, OnInit, Signal, signal } from '@angular/core';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { CommonModule, JsonPipe, NgTemplateOutlet } from '@angular/common';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';
import { GameSearchService } from 'src/app/core/services/common/game-search.service';
import { SpinnerComponent } from '../../../../../shared/spinner/spinner.component';
import { AbstractGamesPageComponent } from 'src/app/shared/abstract-games-page/abstract-games-page.component';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { AbstractGamesPageParams } from 'src/app/core/models/abstract-games-page-params';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-games-page',
  // templateUrl: './games-page.component.html',
  templateUrl: '../../../../../shared/abstract-games-page/abstract-games-page.component.html',
  // imports: [JsonPipe],
  standalone: true,
  imports: [GameListComponent, CommonModule, SpinnerComponent, NgTemplateOutlet, ReactiveFormsModule, InfiniteScrollModule],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesPageComponent extends AbstractGamesPageComponent{
  //! nos llevamos la logica que estaba aca al abstract

  override defaultSearchFilter: SearchFilters = {
    ...this.defaultSearchFilter,
  }

  override componentParams: AbstractGamesPageParams = {
    // para el filtro de la directiva if vinculado al select que es iniciado en true
    ...this.componentParams,
    title: 'All Games',
  };

  constructor(){
    super();
  }
}
