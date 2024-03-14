import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AutoDestroyService } from '../services/utils/auto-destroy.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { GameSearchService } from '../services/common/game-search.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AutoDestroyService],
  standalone: true,
  imports: [RouterOutlet, FormsModule]
})
export class MainLayoutComponent implements OnInit{

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
