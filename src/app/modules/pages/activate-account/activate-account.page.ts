import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeaderService} from "../../shared/ui/header/header.service";
import {SecurityService} from "../../api/auth/services/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.page.html',
  styleUrls: ['./activate-account.page.scss']
})
export class ActivateAccountPage {

  activateForm: FormGroup;

  returnUrl = 'login';

  constructor(private headerService: HeaderService,
              private securityService: SecurityService,
              private router: Router,
              ) {
    headerService.setTitle('Activar Cuenta');
    this.activateForm = new FormGroup({
      activationCodeCtrl:
        new FormControl(null, [Validators.required, Validators.minLength(36)])
    });
  }

  onSubmit(): void {
    this.securityService.active(
      {code: this.activateForm.controls.activationCodeCtrl.value}).subscribe(() => {
      this.router.navigate([this.returnUrl]);
    });
  }
}
