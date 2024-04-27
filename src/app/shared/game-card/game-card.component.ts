import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from 'src/app/core/models/game';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/common/auth.service';

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
  $user: Signal<User | null> = this.authService.$user;

  constructor( private authService: AuthService ){}

  addFavourite(): void {
    this.$user()?.addGame(this.game);
  }
}
