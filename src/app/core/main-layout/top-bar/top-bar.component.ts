import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { GameSearchService } from '../../services/common/game-search.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/common/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterOutlet, CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  queryChange$: Subject<string> = new Subject<string>;
  query: string = '';

  $user: Signal<User | null> = this.authService.$user;

  constructor(
    private gameSearchService: GameSearchService,
    private destroy$: AutoDestroyService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.suscribeToInputChanges();
  }

  suscribeToInputChanges(){
    this.queryChange$.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe((query: string) =>
    this.gameSearchService.setQueryString(query))
  }

  logout(): void{
    this.authService.logout();
  }
}
