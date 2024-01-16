import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ISignupUserRequest, ISignupUserResponse } from 'src/app/core/models/signupUser';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.component.html',
  styleUrls: ['./create-login.component.scss']
})
export class CreateLoginComponent implements OnInit, OnDestroy{
  private readonly destroy$: Subject<void>  = new Subject(); // EVITANDO VAZAMENTO DE MEMORIA
  form!: FormGroup;
  loginCard: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [ null, Validators.required],
      email: [ null, Validators.required],
      password: [ null, Validators.required]
    });

  }

  signupUser(): void {
    if ( this.form.valid) {
      this.userService.signupUser(this.form.value as ISignupUserRequest)
      .pipe(takeUntil(this. destroy$)) // EVITANDO VAZAMENTO DE MEMORIA
      .subscribe({
        next: (response: ISignupUserResponse) =>{
          if (response) {
            this.form.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Usuário criado com sucesso!`,
             life: 2000,
            });
          }
        },
        error: (err) =>{
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${err?.error?.error} - Erro ao criar usuário`,
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
