import { ChangeDetectionStrategy, Component, Signal, computed } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { GameListComponent } from 'src/app/shared/game-list/game-list.component';
import { AuthService } from '../../../../../../core/services/common/auth.service';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameListComponent],
  standalone: true,
})
export class UserLibraryComponent {

  $games: Signal<Game[]> = computed(() => Array.from(this.authService.$user()?.favouriteGames || [])) ?? [];


  constructor(private authService: AuthService){}
}
