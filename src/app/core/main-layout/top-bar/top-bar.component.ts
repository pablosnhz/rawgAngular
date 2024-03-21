import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameSearchService } from '../../services/common/game-search.service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  queryChange$: Subject<string> = new Subject<string>;
  query: string = '';

  constructor( private gameSearchService: GameSearchService, private destroy$: AutoDestroyService ){}

  ngOnInit(): void {
    this.suscribeToInputChanges();
  }

  suscribeToInputChanges(){
    this.queryChange$.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
    .subscribe((query: string) =>
    this.gameSearchService.setQueryString(query))
  }
}
