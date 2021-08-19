import { Injectable } from '@angular/core';
import {DispService} from "../../api/availability/services/disp.service";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Availability} from "../../api/availability/models/availability";

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  constructor( private dispService: DispService) { }

  // solicita la disponibilidad al server
  getAvailability(
    travelType: string,
    travelMode: string,
    origin: string,
    destination: string,
    depDate: string,
    cbDate: string): Observable<Availability[]> {

    let availabilities = this.dispService.availabilities({
      source: origin,
      target: destination,
      startDate: depDate,
      endDate: cbDate
    });

    if (cbDate === '3000-09-02') {
      availabilities = availabilities.pipe(
        map(rawdata =>
          rawdata.filter(item => {
            return item.travelType === 'Ida';
          })
        )
      );
    }

    availabilities = availabilities.pipe(
      map(rawdata => rawdata.filter(item => item.available!.toString() === 'true'))
    );

    return availabilities;
  }
}
