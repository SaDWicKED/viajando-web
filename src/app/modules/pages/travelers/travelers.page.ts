import {Component, OnDestroy, OnInit} from '@angular/core';
import {Traveler} from "../../shared/models/traveler";
import {User} from "../../api/auth/models/user";
import {HeaderService} from "../../shared/ui/header/header.service";

@Component({
  selector: 'app-travelers',
  templateUrl: './travelers.page.html',
  styleUrls: ['./travelers.page.scss']
})
export class TravelersPage implements OnInit, OnDestroy {

  travelers: Traveler[] | undefined;
  max: number | undefined;
  currentUser: User | undefined;


  constructor(private headerService: HeaderService) {
    this.headerService.setTitle('Mis Viajeros');
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser')!);
    const viajeros = localStorage.getItem('viajeros' + this.currentUser!.id);
    if (viajeros) {
      this.travelers = JSON.parse(viajeros);
      this.max = JSON.parse(viajeros).length;
    }
  }

  ngOnDestroy(): void {
    this.travelers = JSON.parse(localStorage.getItem('viajeros' + this.currentUser!.id)!);
    this.removeInvalidTravelers();
    localStorage['viajeros' + this.currentUser!.id] = JSON.stringify(this.travelers);
  }

  onInsert(): void {
    this.max! += 1;
    const travelers: Traveler[] = JSON.parse(localStorage.getItem('viajeros' + this.currentUser!.id)!);
    travelers.push(new Traveler('', ''));
    this.travelers = travelers;
    localStorage['viajeros' + this.currentUser!.id] = JSON.stringify(this.travelers);
  }

  onDelete(): void {
    this.max! -= 1;
    this.travelers = JSON.parse(localStorage.getItem('viajeros' + this.currentUser!.id)!);
  }

  removeInvalidTravelers() {
    const nameReg = /^([a-zñáéíóúA-ZÁÉÍÓÚ.]+[\s]*)+$/g;
    const idReg = /^[0-9]{11}$/g;
    this.travelers = this.travelers!.filter(traveler => traveler.fullName.match(nameReg)
      && traveler.id.match(idReg));
  }
}
