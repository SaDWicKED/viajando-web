import {AfterViewInit, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Agency} from "../../../api/availability/models/agency";
import * as L from 'leaflet';

@Component({
  selector: 'app-agency-detail',
  templateUrl: './agency-detail.component.html',
  styleUrls: ['./agency-detail.component.scss']
})
export class AgencyDetailComponent implements AfterViewInit {

  lat: number;
  lng: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Agency) {
    this.lat = +this.data.coordinates!.split(',')[0];
    this.lng = +this.data.coordinates!.split(',')[1];
  }

  ngAfterViewInit(): void {
    if (this.lng) {
      this.initMap();
    }
  }

  // inicializa el mapa
  private initMap(): void {
    // info sobre el marcador
    const iconRetinaUrl = '../../../assets/marker-icon-2x.png';
    const iconUrl = '../../../assets/marker-icon.png';
    const shadowUrl = '../../../assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    // posicion de la agencia
    const agencyPosition = {lat: this.lat, lng: this.lng};

    // crear el mapa
    const map = L.map('map', {
      center: agencyPosition,
      zoom: 16
    });

    // plantilla del mapa
    const OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 12,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // añadir marcador
    L.marker([this.lat, this.lng], {
      icon: iconDefault
    }).bindPopup(`<b>${this.data.name}</b>`).addTo(map);

    // centrar el mapa a la posicion de la agencia cuando se mueve el mapa
    map.on("zoom", function () {
      return map.flyTo(agencyPosition);
    });

    OpenStreetMap_DE.addTo(map);
  }
}
