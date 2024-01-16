import { CookieService } from 'ngx-cookie-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { IAuthRequest, IAuthResponse } from 'src/app/core/models/auth';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy{
  private readonly destroy$: Subject<void>  = new Subject();  // EVITANDO VAZAMENTO DE MEMORIA
  form!: FormGroup;
  loginCard: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cookieService : CookieService,
    private messageService: MessageService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [ null, Validators.required],
      password: [ null, Validators.required]
    });

  }


  authUser(): void {
    if ( this.form.valid) {
      this.userService.authUser(this.form.value as IAuthRequest)
      .pipe(takeUntil(this. destroy$)) // EVITANDO VAZAMENTO DE MEMORIA
      .subscribe({
        next: (response: IAuthResponse) =>{
          if (response) {
           this.cookieService.set('USER_INFO', response?.token);
           this.form.reset();
           this.messageService.add({
             severity: 'success',
             summary: 'Success',
             detail: `${response?.name}, você logou com sucesso!`,
            life: 2000,
           });
           this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${err?.error?.error}`,
           life: 2000,
          });
        }
      });
    }
  }

  // EVITANDO VAZAMENTO DE MEMORIA
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
