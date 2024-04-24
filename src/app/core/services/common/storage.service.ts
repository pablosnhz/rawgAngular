import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {

  constructor() { }



  set(key: string, value: string, storage: Storage): void {
    storage.setItem(key, value);
  }
  get(key: string): any {
    return localStorage.getItem(key) || sessionStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}
