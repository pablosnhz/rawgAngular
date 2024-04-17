import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { AutoDestroyService } from '../services/utils/auto-destroy.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { GameSearchService } from '../services/common/game-search.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { AsideBarComponent } from './aside-bar/aside-bar.component';
import { CommonModule } from '@angular/common';
import { GenresResult } from '../models/genres';
import { GenreService } from 'src/app/routes/pages/games-page/services/genre.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AutoDestroyService],
  standalone: true,
  imports: [RouterOutlet, FormsModule, TopBarComponent, AsideBarComponent, CommonModule],
})
export class MainLayoutComponent {

  constructor( private genreService: GenreService, private destroy$: AutoDestroyService  ){
    this.getGenres()
  }

  getGenres():void {
    this.genreService.getGenres().pipe(take(1)).subscribe();
    }
}

