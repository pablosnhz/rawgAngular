import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDetails } from 'src/app/core/models/game-details';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
  standalone: true
})
export class GameDetailComponent implements OnInit{

  gameDetails: GameDetails;

  constructor( private route:ActivatedRoute,  ){}

  //* segun como lo llame en el resolve del path resolve, en este caso game
  ngOnInit(): void {
    this.gameDetails = this.route.snapshot.data['game'] as GameDetails;
    // console.log(this.gameDetails)
  }
}
