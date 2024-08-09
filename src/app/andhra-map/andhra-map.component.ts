import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-andhra-map',
  templateUrl: './andhra-map.component.html',
  styleUrls: ['./andhra-map.component.css']
})
export class AndhraMapComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const map = L.map('map', {
      center: [16.5062, 80.6480], 
      zoom: 7
    });

    const basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    basemap.addTo(map);
  }

}
