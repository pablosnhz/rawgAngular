import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../../main-layout/top-bar/top-bar.component';
import { AutoDestroyService } from '../../services/utils/auto-destroy.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  standalone: true,
  imports: [RouterOutlet, TopBarComponent],
  providers: [AutoDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent {

}
