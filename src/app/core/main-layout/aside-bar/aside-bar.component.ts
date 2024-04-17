import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GenreService } from 'src/app/routes/pages/games-page/services/genre.service';
import { Genre } from '../../models/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside-bar',
  templateUrl: './aside-bar.component.html',
  styleUrls: ['./aside-bar.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AsideBarComponent {

  $genres: Signal<Genre[]> = this.genreService.$genres;

  constructor( private genreService: GenreService ){

  }
}
