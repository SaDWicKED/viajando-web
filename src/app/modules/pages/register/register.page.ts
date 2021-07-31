import {AfterContentChecked, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPasswordStrengthComponent} from '@angular-material-extensions/password-strength';
import {HeaderService} from "../../ui/header/header.service";
import {CustomValidators} from "../../shared/tools/custom-validators";
import {MatSelectChange} from "@angular/material/select";
import places from './localities.json';
import {SecurityService} from "../../api/auth/services/security.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements AfterContentChecked {

  locations: any;
  provinces: any;
  municipalities: string[] | undefined;
  registerForm: FormGroup;

  @ViewChild('passwordComponentWithConfirmation', {static: true})
  passwordComponentWithConfirmation: MatPasswordStrengthComponent | undefined;

  constructor(private headerService: HeaderService,
              private securityService: SecurityService,
              private router: Router,
              private cdref: ChangeDetectorRef,) {
    this.headerService.setTitle('Viajando');

    this.locations = places.locations;
    this.provinces = Object.keys(this.locations);

    this.registerForm = new FormGroup({
      firstnameCtrl: new FormControl('', [Validators.required, CustomValidators.invalidName]),
      lastnameCtrl: new FormControl('', [Validators.required, CustomValidators.invalidName]),
      dniCtrl: new FormControl('', [Validators.required, CustomValidators.invalidID]),
      mobilePhoneCtrl: new FormControl('', [Validators.required, CustomValidators.invalidPhone]),
      provinceCtrl: new FormControl('', [Validators.required]),
      municipalityCtrl: new FormControl({value: '', disabled: true}, [Validators.required]),
      emailCtrl: new FormControl('', [Validators.required, Validators.email]),
      usernameCtrl: new FormControl(),
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onSubmit(): void {
    const user = {
      firstName: this.f.firstnameCtrl.value,
      lastName: this.f.lastnameCtrl.value,
      userName: this.f.emailCtrl.value.replace('@', '.'),
      email: this.f.emailCtrl.value,
      mobile: this.f.mobilePhoneCtrl.value,
      locality: this.f.municipalityCtrl.value,
      ci: this.f.dniCtrl.value,
      state: this.f.provinceCtrl.value,
      password:  this.passwordComponentWithConfirmation?.passwordFormControl.value
    };

    this.securityService.insertUser({body: user}).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  provinceSelectionChanged($event: MatSelectChange): void {
    this.municipalities = this.getMunicipalitiesByProvince($event.value);
    this.f.municipalityCtrl.enable();
    this.f.municipalityCtrl.setValue(undefined);
  }

  getMunicipalitiesByProvince(province: string): string[] {
    return this.locations[`${province}`];
  }


}
