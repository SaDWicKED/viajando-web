import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeaderService} from "../../shared/ui/header/header.service";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {RedirectionService} from "../../shared/services/redirection.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  @ViewChild('password-icon', {static: true}) passwordIcon: any;
  passIconString = 'visibility_off';
  loginForm: FormGroup;

  constructor(private headerService: HeaderService,
              private authService: AuthService,
              private router: Router,
              private redirectionService: RedirectionService) {
    this.headerService.setTitle('Viajando');
    this.loginForm = new FormGroup({
      emailCtrl: new FormControl(null, [Validators.email, Validators.required]),
      passwordCtrl: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    this.authService.login(
      this.loginForm.get('emailCtrl')?.value.replace('@', '.'),
      this.loginForm.get('passwordCtrl')?.value).subscribe(
      () => {
          this.router.navigate([this.redirectionService.getReturnURL()])
        });
  }

  togglePasswordVisibility(): void {
    this.passIconString = this.passIconString === 'visibility' ? 'visibility_off' : 'visibility';
  }
}
