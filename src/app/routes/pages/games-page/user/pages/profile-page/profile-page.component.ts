import { Component, ChangeDetectionStrategy, Signal } from '@angular/core';
import { AuthService } from '../../../../../../core/services/common/auth.service';
import { User } from 'src/app/core/models/user';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {

  $user: Signal<User | null> = this.AuthService.$user;
  constructor(private AuthService: AuthService) { }
}
