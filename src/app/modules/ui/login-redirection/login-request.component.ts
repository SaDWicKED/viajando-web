import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-login-redirection',
  templateUrl: './login-request.component.html',
  styleUrls: ['./login-request.component.scss']
})
export class LoginRequestComponent implements OnInit {

  constructor(private router: Router,  public dialogRef: MatDialogRef<LoginRequestComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRegister(): void {
    this.router.navigate(['register']);
    this.dialogRef.close();
  }

  onLogin(): void {
    this.router.navigate(['login']);
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
