import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AbstractGamesPageParams } from 'src/app/core/models/abstract-games-page-params';
import { Genre } from 'src/app/core/models/game';
import { SearchFilters } from 'src/app/core/models/search-filters';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { AbstractGamesPageComponent } from 'src/app/shared/abstract-games-page/abstract-games-page.component';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-genre-page',
  standalone: true,
  imports: [
    GameListComponent,
    CommonModule,
    SpinnerComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    InfiniteScrollModule],
  providers: [AutoDestroyService],
  templateUrl: './../../../.././../shared/abstract-games-page/abstract-games-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent extends AbstractGamesPageComponent implements OnInit{

  @Input('genre') genre: string;

  override defaultSearchFilter: SearchFilters = {
    ...this.defaultSearchFilter,
    genres: '',
  };

  override componentParams: AbstractGamesPageParams = {
    title: 'Genre'
  };

  constructor( private route: Router ){
    super();
  }

  override ngOnInit(): void {
    if(!this.$genres().find((genre) => genre.name.toLowerCase() === this.genre.toLowerCase())){
      this.route.navigate(['/']);
    } else {
      this.setGenreParams();
      super.ngOnInit();
    }
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['genre']) {
  //     this.setGenreParams();
  //     super.ngOnInit();
  //   }
  // }

  setGenreParams():void {
    this.componentParams.title = this.genre.slice(0, 1).toUpperCase() + this.genre.slice(1);

    const genre: Genre = this.$genres().find((genre) => genre.name.toLowerCase() === this.genre.toLowerCase())!;
    this.defaultSearchFilter = {
      ...this.defaultSearchFilter,
      genres : genre.id.toString()
    }
  }
}


