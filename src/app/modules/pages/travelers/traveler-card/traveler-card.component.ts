import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../shared/tools/custom-validators";
import {Traveler} from "../../../shared/models/traveler";

@Component({
  selector: 'app-traveler-card',
  templateUrl: './traveler-card.component.html',
  styleUrls: ['./traveler-card.component.scss']
})
export class TravelerCardComponent implements OnInit {

  @Input() traveler: Traveler | undefined;
  @Input() index: number | undefined;
  @Output() deleteItemEvent = new EventEmitter<string>();
  travelerForm: FormGroup | undefined;
  currentUser;

  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser') + "");
  }

  ngOnInit(): void {
    this.travelerForm = new FormGroup({
      fullName: new FormControl(this.traveler?.fullName!, [Validators.required, CustomValidators.invalidName]),
      id: new FormControl(this.traveler?.id!, [Validators.required, CustomValidators.invalidID])
    });

    this.travelerForm.valueChanges.subscribe(val => {
      if (this.travelerForm!.valid) {
        const item = JSON.parse(localStorage.getItem('viajeros' + this.currentUser.id)!);
        item[this.index!] = val;
        localStorage.setItem('viajeros' + this.currentUser.id, JSON.stringify(item));
      }
    });
  }

  onDelete() {
    const item = JSON.parse(localStorage.getItem('viajeros' + this.currentUser.id)!);
    item.splice(this.index, 1);
    localStorage.setItem('viajeros' + this.currentUser.id, JSON.stringify(item));
    this.deleteItemEvent.emit('deleted');
  }
}
