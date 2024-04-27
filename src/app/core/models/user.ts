import { inject } from "@angular/core";
import { StorageService } from "../services/common/storage.service";
import { Game } from "./game";
import { USER_STORAGE_KEY } from "../constants/user-storage-key";

export class User {
  email: string;
  name: string;
  favouriteGames: Set<Game>;
  storageService: StorageService;

  constructor( {email, name, storageService, favouriteGames
  }:{email: string, name: string, storageService: StorageService, favouriteGames?: Game[]} ){
    this.email = email;
    this.name = name;
    this.favouriteGames = new Set(favouriteGames??[]);
    this.storageService = storageService;
  }

  addGame(game: Game): void {
    if(this.favouriteGames.has(game)){
      this.favouriteGames.delete(game);
    } else {
      this.favouriteGames.add(game);
    }
    this.updatedStorage();
  }

  updatedStorage(): void {
    this.storageService.update(USER_STORAGE_KEY, JSON.stringify(
      {
        email: this.email,
        name: this.name,
        favouriteGames: Array.from(this.favouriteGames)
      }
    ))
  }
}
