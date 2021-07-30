import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tournament, TournamentData, TournamentsService } from 'src/app/services/tournaments-service/tournaments.service';

declare var google: any;

@Component({
  selector: 'app-tournaments-detail',
  templateUrl: './tournaments-detail.component.html',
  styleUrls: ['./tournaments-detail.component.scss']
})
export class TournamentsDetailComponent implements OnInit {

  zoom = 12
  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  
  map!: google.maps.Map;
  filterValue!: string;
  dataSource!: any;
  displayedColumns: string[] = ['key', 'value'];
  id!: string;
  
  myMap: Map<String, String> = new Map([
    ["data", 'Data rozpoczęcia turnieju'], 
    ["deadline", "Data, do której można zgłosić się na turniej"],
    ["discipline", "Dyscyplina"],
    ["id", "Id"],
    ["limit", "Limit osób"],
    ["location", "Lokalizcja"],
    ["name", "Nazwa turnieju"],
    ["organizer", "Organizator"],
    ["seeded_players", "Liczba zawodników rozstawionych"]
  ]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private tourService: TournamentsService
    ) { }

  ngOnInit(): void {
    this.getId()
    this.getTournament()
    this.loadMap()
    this.initMap()
  }
  

  getId(){
     this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      });
  }



  getTournament(){
    this.tourService.findOne(this.id).pipe(
      map(tourData => {
        this.dataSource = tourData

        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        })

      })
    ).subscribe()
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }

  
  loadMap(){
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, mapOptions) 
  }

  zoomIn() {
    if (this.options.maxZoom != undefined){
      if (this.zoom < this.options.maxZoom) this.zoom++
    }
  }

  zoomOut() {
    if (this.options.minZoom != undefined){
    if (this.zoom > this.options.minZoom) this.zoom--
  }
}

}