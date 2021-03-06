import {AfterContentChecked, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPasswordStrengthComponent} from '@angular-material-extensions/password-strength';
import {HeaderService} from "../../shared/ui/header/header.service";
import {CustomValidators} from "../../shared/tools/custom-validators";
import {MatSelectChange} from "@angular/material/select";
import places from './localities.json';
import {SecurityService} from "../../api/auth/services/security.service";
import {Router} from "@angular/router";
import {ConfirmDialogComponent} from "../../shared/ui/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";


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
              private dialog: MatDialog,
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
  get f(): {[p: string]: AbstractControl} {
    return this.registerForm.controls;
  }

  ngAfterContentChecked(): void {
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
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        width: '500px',
        data: {
          title: 'Cuenta creada',
          content: 'Su cuenta se ha creado satisfactoriamente. Revise su correo para activarla ',
          acceptText: 'ok',
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate(['login']);
        }
      });

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
