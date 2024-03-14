import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from 'src/app/core/models/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class GameCardComponent {
  // no lo inicialice porque le saque el strict del ts y asi poder mostrar los datos
  @Input({ required: true }) game: Game;
}
