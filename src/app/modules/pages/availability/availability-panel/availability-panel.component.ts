import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {Locality} from "../../../api/availability/models/locality";
import {DispService} from "../../../api/availability/services/disp.service";
import {SettingsService} from "../../../api/settings/services/settings.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-availability-card',
  templateUrl: './availability-panel.component.html',
  styleUrls: ['./availability-panel.component.scss']
})
export class AvailabilityPanelComponent implements OnInit {

  travelForm: FormGroup;
  minDate1: Date;
  minDate2: Date;
  maxDate: Date;

  origins: Locality[];
  destinations: Locality[];

  filteredOrigins: Locality[];
  filteredDestinations: Locality[];

  interchanging: boolean;
  originName: string;

  firstTimeLoading: boolean;

  constructor( private locationService: DispService,
               private settingsService: SettingsService,
               private datePipe: DatePipe,
               private router: Router) {
    this.minDate1 = new Date();
    this.minDate2 = new Date();
    this.maxDate = new Date('3000-1-2');

    this.origins = [];
    this.destinations = [];
    this.filteredOrigins = [];
    this.filteredDestinations = [];

    this.interchanging = false;
    this.originName = '';

    this.firstTimeLoading = true;

    this.travelForm = new FormGroup({
      originCtrl: new FormControl(null, [Validators.required, this.invalidLocationName]),
      destinationCtrl: new FormControl({value: null, disabled: true}, [Validators.required, this.invalidDestinationName]),
      departureDateCtrl: new FormControl({value: this.minDate1, disabled: true}, [Validators.required]),
      comebackDateCtrl: new FormControl({value: null, disabled: true}, []),
    });
  }

  ngOnInit(): void {
    const lastTravel = JSON.parse(localStorage.getItem('lastTravel')!);

    this.locationService.localities().subscribe(localities => {
      this.origins = localities;
      this.filteredOrigins = localities;

      if (lastTravel) {
        this.travelForm.get('originCtrl')?.setValue(lastTravel.origin);
      }
    });

    this.settingsService.settings().subscribe(settings => {
      this.travelForm.get('departureDateCtrl')?.enable();
      this.travelForm.get('comebackDateCtrl')?.enable();
      this.maxDate = new Date(settings.endBusDate! );
    });

    this.travelForm.get('originCtrl')?.valueChanges.subscribe(value => {
      this.filteredOrigins = this.filterLocations(value, this.origins);
      this.travelForm.get('destinationCtrl')?.setValue('');
      this.travelForm.get('destinationCtrl')?.disable();


      if (this.travelForm.get('originCtrl')?.valid) {
        this.travelForm.get('destinationCtrl')?.enable();

        const codeOfOrigin = this.getCodeByNameLocations(this.travelForm.get('originCtrl')?.value, this.origins);
        this.locationService.targets({code: codeOfOrigin}).subscribe(destinations => {
          this.destinations = destinations;
          this.filteredDestinations = destinations;
          if (lastTravel && this.firstTimeLoading) {
            this.travelForm.get('destinationCtrl')?.setValue(lastTravel.destination);
            this.firstTimeLoading = false;
          } else if (this.interchanging) {
            this.travelForm.get('destinationCtrl')?.setValue(this.originName);
            this.travelForm.get('destinationCtrl')?.markAsTouched();
            this.interchanging = false;
          }
        });
      }
    });

    this.travelForm.get('destinationCtrl')?.valueChanges.subscribe(value => {
      this.filteredDestinations = this.filterLocations(value, this.destinations);
    });

  }

  onSubmit(): void {
    const travelType = this.travelForm.get('comebackDateCtrl')?.value ? 'ida-regreso' : 'ida';

    const origin = this.travelForm.get('originCtrl')?.value;
    const destination = this.travelForm.get('destinationCtrl')?.value;

    const originCode = this.getCodeByNameLocations(origin, this.origins);
    const destinationCode = this.getCodeByNameLocations(destination, this.destinations);

    const departureDate = this.datePipe.transform(this.travelForm.get('departureDateCtrl')?.value, 'yyyy-MM-dd');
    let comebackDate = this.datePipe.transform(this.travelForm.get('comebackDateCtrl')?.value, 'yyyy-MM-dd');

    if (travelType === 'ida') {
      comebackDate = '3000-09-02';
    }
    const lastTravel = {
      origin,
      destination,
      departureDate,
      comebackDate,
    };
    localStorage.setItem('lastTravel', JSON.stringify(lastTravel));

    this.router.navigateByUrl('/results/' +
      travelType + '/' +
      originCode + '/' +
      destinationCode + '/' +
      departureDate + '/' +
      comebackDate);
  }

  onInterchange(): void {
    this.interchanging = true;
    this.originName = this.travelForm.get('originCtrl')?.value;
    const destinationName = this.travelForm.get('destinationCtrl')?.value;
    this.travelForm.get('originCtrl')?.setValue(destinationName);
  }


  ////////////////////////////////////
  //      FUNCIONES AUXILIARES      //
  ////////////////////////////////////

  // Filtra las localidades dado un valor
  filterLocations(value: string, localities: Locality[]): Locality[]{
    return localities.filter(locality => locality.name?.toLowerCase().includes(value?.toLowerCase()))
  }

  // Obtiene el codigo de una localidad dado el nombre
  getCodeByNameLocations(name: string, locations: Locality[]): string | undefined {
    return locations.filter(locality => locality.name === name)[0].code;
  }

  // Obtiene el nombre de una localidad dado el codigo
  getNamebyCodeLocations(code: string, locations: Locality[]): string | undefined {
    return locations.filter(locality => locality.code === code)[0].name;
  }

  // Establece la fecha de salida seleccionada como la fecha minima de regreso
  onDateChange($event: MatDatepickerInputEvent<Date>): void {
    this.minDate2 = new Date($event.value!);
  }

  // Valida el origen
  invalidLocationName = (control: FormControl): { [key: string]: boolean } | null => {
    const nameList = this.origins.map(l => l.name);
    if (nameList.indexOf(control.value) === -1) {
      return {nameIsInvalid: true};
    }
    return null;
  }

  // Valida el destino
  invalidDestinationName = (control: FormControl): { [key: string]: boolean } | null => {
    const nameList = this.destinations.map(l => l.name);
    if (nameList.indexOf(control.value) === -1) {
      return {nameIsInvalid: true};
    }
    return null;
  }


}
