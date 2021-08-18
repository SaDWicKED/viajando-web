import {Component, Inject,} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-info',
  templateUrl: './snack-info.component.html',
  styleUrls: ['./snack-info.component.scss']
})
export class SnackInfoComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
