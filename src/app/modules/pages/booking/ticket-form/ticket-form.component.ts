import {Component, Input, OnInit} from '@angular/core';
import {BusSeat} from "../../../shared/models/bus-seat";
import {FormGroup} from "@angular/forms";
import {Traveler} from "../../../shared/models/traveler";
import {User} from "../../../api/auth/models/user";

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {

  @Input() seat: BusSeat | undefined;
  @Input() depForm: FormGroup | undefined;
  @Input() cbForm: FormGroup | undefined;

  savedTravelers: Traveler[] | undefined;
  filteredTravelers: Traveler[] | undefined;

  constructor() { }

  ngOnInit(): void {
    const currentUser: User = JSON.parse(sessionStorage.getItem('currentUser')!);
    this.savedTravelers = JSON.parse(localStorage.getItem('viajeros' + currentUser.id)!);
    this.filteredTravelers = JSON.parse(localStorage.getItem('viajeros' + currentUser.id)!);

    this.depForm!.get('fullName')!.valueChanges.subscribe(val => {
      this.filteredTravelers = this.savedTravelers!.filter(traveler => traveler.fullName.toLowerCase().includes(val.toLowerCase()));
    });

    if (this.cbForm) {
      this.depForm!.valueChanges.subscribe(changes => {
        if (this.depForm!.valid) {
          this.cbForm!.setValue(changes);
        }
      });
    }
  }

  fillForm(traveler: Traveler): void {
    this.depForm!.setValue({
      fullName: traveler.fullName,
      ci: traveler.id
    });
  }

  onClick(traveler: Traveler): void {
    this.depForm!.get('ci')!.setValue(traveler.id);
  }
}
