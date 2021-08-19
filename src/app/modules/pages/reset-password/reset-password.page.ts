import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage implements OnInit {

  codeRequested: boolean | undefined;
  recoverPasswordForm: FormGroup | undefined;
  usernameForm: FormControl | undefined;

  constructor(private authService: AuthService,
              private router: Router,) {
  }

  ngOnInit(): void {
    this.recoverPasswordForm = new FormGroup({
      activationcodeCtrl: new FormControl(null, []),
      passwordCtrl: new FormControl()
    });

    this.usernameForm = new FormControl(null, [Validators.required, Validators.email]);

  }

  get f() {return this.recoverPasswordForm!.controls; }

  onSubmit(): void {
    this.authService.sendPasswordUpdate(this.f.activationcodeCtrl.value.trim(), this.f.passwordCtrl.value).subscribe(
      () => {
        this.router.navigate(['login']);
      }
    );
  }

  requestCode(): void {
    this.authService.requestPasswordChange(this.usernameForm!.value.replace('@', '.')).subscribe(
      () => {
        this.codeRequested = true;
      }
    );
  }
}

