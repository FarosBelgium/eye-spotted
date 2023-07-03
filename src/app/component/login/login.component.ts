import {Component} from '@angular/core';
import {LoginDetail} from "../../model/login-detail";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDetail: LoginDetail = {username: "", password: ""}
  message = "";

  constructor(private authService: AuthService, private router: Router) {
  }

  login(): void {
    this.authService.login(this.loginDetail).subscribe({
      next: value => this.tryNavigate(value),
      error: () => this.showDetailsError()
    });
  }

  private tryNavigate(success: boolean): void {
    if (success) {
      this.message = "";
      this.router.navigate(['/expeditions']);
    } else {
      this.showDetailsError();
    }
  }

  private showDetailsError(): void {
    this.message = "Incorrect username or password. Please try again";
  }

}
