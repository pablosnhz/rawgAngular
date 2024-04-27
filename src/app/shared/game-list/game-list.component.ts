import { ChangeDetectionStrategy, Component, Input, Signal, signal } from '@angular/core';
import { Game } from 'src/app/core/models/game';
import { GameCardComponent } from '../game-card/game-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, GameCardComponent]
})
export class GameListComponent {
  $loading: Signal<boolean> = signal(false);

  @Input({ required: true }) games: Game[] =[];


}
