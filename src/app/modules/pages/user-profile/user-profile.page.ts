import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../shared/tools/custom-validators";
import {User} from "../../api/auth/models/user";
import places from "../register/localities.json";
import {MatSelectChange} from "@angular/material/select";
import {HeaderService} from "../../ui/header/header.service";
import {AuthService} from "../../shared/services/auth.service";
import {UsersService} from "../../api/users/services/users.service";
import {ConfirmDialogComponent} from "../../ui/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {RedirectionService} from "../../shared/services/redirection.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss']
})
export class UserProfilePage implements OnInit{

  locations: any;
  provinces: any;
  municipalities: string[];
  profileForm: FormGroup;
  user: User;
  loading: boolean;

  constructor(private headerService: HeaderService,
              private authService: AuthService,
              private usersService: UsersService,
              private dialog: MatDialog,
              private router: Router,
              private redirectionService: RedirectionService,) {

    this.user = JSON.parse(sessionStorage.getItem('currentUser')!);
    headerService.setTitle('Hola ' + this.user.firstName);

    this.locations = places.locations;
    this.provinces = Object.keys(this.locations);
    this.municipalities = this.getMunicipalitiesByProvince(this.user.state!);
    this.loading = false;

    this.profileForm = new FormGroup({
      givenName: new FormControl(this.user.firstName, [Validators.required, CustomValidators.invalidName]),
      familyName: new FormControl(this.user.lastName, [Validators.required, CustomValidators.invalidName]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      ci: new FormControl(this.user.ci, [Validators.required, CustomValidators.invalidID]),
      mobile: new FormControl(this.user.mobile, [Validators.required, CustomValidators.invalidPhone]),
      provinceCtrl: new FormControl(this.user.state, [Validators.required]),
      municipalityCtrl: new FormControl(this.user.locality, [Validators.required])
    });
  }

  ngOnInit(): void {

  }

  // convenience getter for easy access to form fields
  get f(): {[p: string]: AbstractControl} {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.loading = true;
    const user: User = {
      userName: this.f.email.value.replace('@', '.'),
      id: this.user.id,
      firstName: this.f.givenName.value,
      lastName: this.f.familyName.value,
      email: this.f.email.value,
      ci: this.f.ci.value,
      locality: this.f.municipalityCtrl.value,
      mobile: this.f.mobile.value,
      state: this.f.provinceCtrl.value
    };

    this.usersService.updateUser({body: user}).subscribe(() => {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      this.authService.currentUserSubject.next(user);
      this.loading = false;
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        disableClose: true,
        width: '500px',
        data: {
          title: 'Información actualizada',
          content: 'Su información se ha actualizado correctamente',
          acceptText: 'ok',
        }
      });

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate([this.redirectionService.getReturnURL()]);
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
