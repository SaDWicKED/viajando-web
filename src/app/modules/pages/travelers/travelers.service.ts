import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Traveler} from "../../shared/models/traveler";

@Injectable({
  providedIn: 'root'
})
export class TravelersService {

  travelerSaved: Subject<Traveler> = new Subject<Traveler>();

  constructor() { }
}
