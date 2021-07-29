import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Agency} from "../../../api/availability/models/agency";
import * as mapboxgl from 'mapbox-gl';
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.component.html',
  styleUrls: ['./agency-detail.component.scss']
})
export class AgencyDetailComponent implements AfterViewInit {

  @ViewChild('map', {static: false}) mapElement: ElementRef | undefined;
  map: mapboxgl.Map | undefined;
  lat: number;
  lng: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Agency) {

    this.lat = +this.data.coordinates!.split(',')[0];
    this.lng = +this.data.coordinates!.split(',')[1];

  }

  ngAfterViewInit() {
    if (this.data.coordinates !== '') {
      // @ts-ignore
      Object.getOwnPropertyDescriptor(mapboxgl, `accessToken`)
        .set(environment.mapbox.accessToken);
      this.map = new mapboxgl.Map({
        container: this.mapElement!.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 15,
        center: [this.lng, this.lat],

      });
      // Add map controls
      this.map.addControl(new mapboxgl.NavigationControl());

      const marker = new mapboxgl.Marker();
      marker.setLngLat([this.lng, this.lat]);
      marker.addTo(this.map);
    }
  }

}
