import { Injectable } from "@angular/core";
import { GameService } from '../../routes/pages/games-page/services/game.service';
import { GameDetails } from "../models/game-details";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameIdResolver implements Resolve<Observable<GameDetails>> {

  constructor( private gameService: GameService, ){}

  resolve(route: ActivatedRouteSnapshot): Observable<GameDetails>{
    return this.gameService.getGameById(route.params['id'])
  }

}
