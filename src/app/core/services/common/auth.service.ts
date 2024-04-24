import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, of, finalize, delay } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $loading: WritableSignal<boolean> = signal(false);

  constructor(  ) { }

  login({email, password, rememberMe}: {email: string, password: string, rememberMe: boolean}): Observable<User>  {
    this.$loading.set(true);
    // console.log('login', email, password, rememberMe);
    return of( { email, name: 'Emesse Enne' })
    .pipe(
      delay((1500)),
      finalize(() => this.$loading.set(false))
    )
  }
}

