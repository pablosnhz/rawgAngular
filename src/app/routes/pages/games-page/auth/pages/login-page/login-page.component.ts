import { ChangeDetectionStrategy, Component, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, exhaustMap, filter, of, takeUntil, tap } from 'rxjs';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { AuthService } from '../../../../../../core/services/common/auth.service';
import { User } from 'src/app/core/models/user';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/common/storage.service';
import { USER_STORAGE_KEY } from 'src/app/core/constants/user-storage-key';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [ReactiveFormsModule, SpinnerComponent, CommonModule],
  providers: [AutoDestroyService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit{

  form: FormGroup;
  submitClicked$: Subject<void> = new Subject<void>();
  rememberMe: boolean = false;
  $loading: Signal<boolean> = this.authService.$loading

  constructor(
    private fb: FormBuilder,
    private destroy$: AutoDestroyService,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ){}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToSubmit();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    })
  }

  subscribeToSubmit(): void {
    this.submitClicked$
    .pipe(takeUntil(this.destroy$))
    .pipe(
      tap(() => {
        if(this.form.invalid){
          Object.values(this.form.controls).forEach(control => {
            if(control.invalid){
              control.markAsDirty();
              control.updateValueAndValidity({ onlySelf: true });
            }
          })
        }
      }),
      filter(() => this.form.valid),
      exhaustMap(() =>
        this.authService.login( this.form.value ))
    )
    .subscribe((user: User) => {
      // console.log('user', user);
      this.storageService.set(USER_STORAGE_KEY, JSON.stringify(user),
      this.form.value.rememberMe ?  localStorage : sessionStorage);
      this.router.navigate(['/']);
    })
  }

}
