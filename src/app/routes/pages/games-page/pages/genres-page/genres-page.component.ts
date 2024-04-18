import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre } from 'src/app/core/models/game';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss'],
  standalone: true,
  imports: [CommonModule, SpinnerComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenresPageComponent {

  $genres: Signal<Genre[]> = this.genreService.$genres;
  $loading: Signal<boolean> = this.genreService.$loading;

  constructor( private genreService: GenreService ){}


}
