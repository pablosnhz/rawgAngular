import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameDetails } from 'src/app/core/models/game-details';
import { environment } from 'src/environments/environment.development';

// * sacamos el providedin root
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor( private httpClient:HttpClient ) { }

  getGameById(id: number): Observable<GameDetails>{
    return this.httpClient.get<GameDetails>(`${environment.BASE_API_URL}games/${id}`)
  }
}
