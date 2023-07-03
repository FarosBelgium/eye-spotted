import {Component} from '@angular/core';
import {RegisterDetail} from "../../model/register-detail";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent {
  message = "";

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
    repeatPassword: new FormControl<string>('', [Validators.required])
  })

  constructor(private authService: AuthService, private translateService: TranslateService,
              private router: Router, private translate: TranslateService, private messageService: MessageService) {
  }

  register(): void {
    const email: string = this.form.value.email!;
    const username: string = this.form.value.username!;
    const password: string = this.form.value.password!;
    const repeatPassword: string = this.form.value.repeatPassword!;

    if (this.form.valid) {
      if (password !== repeatPassword) {
        this.message = "Passwords do not match"
        return;
      }

      const registerDetail: RegisterDetail = {
        username,
        email,
        password,
        repeatPassword
      }

      this.authService.register(registerDetail).subscribe({
        next: () => this.navigate(),
        error: (err: HttpErrorResponse) => this.handleError(err)
      })
    } else {
      this.showValidationMessage();
    }
  }

  private navigate(): void {
    const messages = this.translate.instant('login.registerSuccess')
    this.messageService.add({severity: 'success',summary: 'Success', detail: messages})
    this.router.navigate(['/login']);
  }

  private handleError(err: HttpErrorResponse): void {
      if(err.status === 400) {
        if (err.error && err.error.code){
          this.message = this.translateService.instant("error." + err.error.code);
        }
      } else {
        this.message = err.message;
      }
  }

  private showValidationMessage(): void{
    if (this.form.controls.username.errors) {
      this.message = this.translateService.instant("error.USERNAME_REQUIRED");
    } else if(this.form.controls.email.errors) {
      this.message = this.translateService.instant("error.EMAIL_REQUIRED");
    }else if(this.form.controls.password.errors) {
      this.message = this.translateService.instant("error.PASSWORD_REQUIRED");
    }else if(this.form.controls.repeatPassword.errors) {
      this.message = this.translateService.instant("error.REPEAT_PASSWORD_REQUIRED");
    }
  }
}
