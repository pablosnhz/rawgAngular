import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { AbstractGamesPageComponent } from 'src/app/shared/abstract-games-page/abstract-games-page.component';

@Component({
  selector: 'app-new-games-page',
  templateUrl: './new-games-page.component.html',
  styleUrls: ['../../../../../shared/abstract-games-page/abstract-games-page.component.html'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGamesPageComponent extends AbstractGamesPageComponent{

  override searchFilters: SearchFilters = {
    ...this.searchFilters,
    ordening: '-released',
    metacritic: '80,100'
  }

  constructor(){
    super();
  }
}
