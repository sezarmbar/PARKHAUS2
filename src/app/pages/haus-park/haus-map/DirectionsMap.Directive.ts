import { GoogleMapsAPIWrapper } from '@agm/core/services/google-maps-api-wrapper';
import { Directive, Input, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective implements OnInit {
  @Input() origin;
  @Input() destination;
  @Input() infoMarker;
  @Input() directionsDisplay: any;
  @Input() elPlanRout: any;
  public oriLat: number;
  public oriLng: number;
  public currentPosition = { lat: 0, lng: 0 };
  public travelMode = 'DRIVING';
  public icons: any;
  public map: any;
  public prevInfoWindows: any = false;
  public markerArray = [];


  constructor(private gmapsApi: GoogleMapsAPIWrapper, private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this.icons = {
        start: new google.maps.MarkerImage(
          'assets/start.png'
        ),
        end: new google.maps.MarkerImage(
          'assets/end.png'
        )
      };
    });
  }
  ngOnInit() {
    this.currentlocationFind();
  }

  currentlocationFind() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          this.currentPosition = { lat: location.coords.latitude, lng: location.coords.longitude };
          if (!(this.destination.lat === 0 || this.destination.lat === undefined)) {
            this.renderDirection();
          }
        },
        err => {
          if (err.code === 1) {
            alert("Kein GPS Signal")
            console.log('Error: Access is denied!');
          } else if (err.code === 2) {
            console.log('Error: Position is unavailable!');
          }
        });
    }
  }


  // setMaker() {
  //   let me = this;
  //   if (navigator.geolocation) {
  //     // timeout at 20000 milliseconds (20 seconds)
  //     const options = { timeout: 20000, enableHighAccuracy: true, maximumAge: 0 };
  //     this.watchID = navigator.geolocation.watchPosition(position => {
  //       me.markerPos.lat = position.coords.latitude;
  //       me.markerPos.lng = position.coords.longitude;
  //     },
  //       err => {
  //         if (err.code === 1) {
  //           alert("Kein GPS Signal")
  //           console.log('Error: Access is denied!');
  //         } else if (err.code === 2) {
  //           console.log('Error: Position is unavailable!');
  //         }
  //       }
  //       , options);
  //   } else {
  //     console.log('Sorry, browser does not support geolocation!');
  //   }
  // }
  renderDirection(travelMode?) {
    if (!(this.destination.lat === 0 || this.destination.lat === undefined || this.currentPosition.lat === 0)) {
      if (!(travelMode === undefined)) {
      this.travelMode = travelMode;
      } else { this.travelMode = 'DRIVING'; }
      for (let i = 0; i < this.markerArray.length; i++) {
        this.markerArray[i].setMap(null)
      }
      this.markerArray = [];
      if (this.currentPosition.lat != undefined || this.destination.lat != undefined) {
        this.gmapsApi.getNativeMap().then(map => {
          const me = this;
          me.map = map;

          const directionsService = new google.maps.DirectionsService;
          this.directionsDisplay.setMap(map);
          this.directionsDisplay.setOptions({
            polylineOptions: {
              strokeWeight: 4,
              strokeOpacity: 0.7,
              strokeColor: '#ff7400'
            }
          });
          google.maps.event.trigger(map, "resize");
          // remove default markers
          this.directionsDisplay.setOptions({ suppressMarkers: true });
          //
          this.directionsDisplay.setDirections({ routes: [] });
          directionsService.route({
            origin: { lat: this.currentPosition.lat, lng: this.currentPosition.lng },
            destination: { lat: this.destination.lat, lng: this.destination.lng },
            waypoints: [],
            optimizeWaypoints: true,
            // travelMode: google.maps.DirectionsTravelMode.DRIVING
            travelMode: me.travelMode
          }, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              me.directionsDisplay.setDirections(response);
              var leg = response.routes[0].legs[0];
              me.makeMarker(leg.start_location, me.icons.start, "title", 0, leg.start_address);
              let infoMarker;
              if (me.infoMarker) { infoMarker = me.infoMarker } else { infoMarker = leg.end_address }
              me.makeMarker(leg.end_location, me.icons.end, 'title', 1, infoMarker);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
          this.directionsDisplay.setPanel(this.elPlanRout.nativeElement);

        });
      }
    }
  }
  clearDirection() {
    this.directionsDisplay.setMap(null);
    for (let marker of this.markerArray) {
      marker.setMap(null)
    }
  }
  makeMarker(position, icon, title, i, content) {
    var marker = new google.maps.Marker({
      position: position,
      map: this.map,
      icon: icon,
      animation: google.maps.Animation.DROP,
      title: title
    });
    this.markerArray[i] = marker;
    var infoWindow = new google.maps.InfoWindow({
      content: '<div class="info_content">' + content + '</div>'
    });
    google.maps.event.addListener(marker, 'click', event => {
      if (this.prevInfoWindows) {
        this.prevInfoWindows.close();
      }
      this.prevInfoWindows = infoWindow;
      infoWindow.open(this.map, marker);
    });
    google.maps.event.addListener(this.map, 'click', event => {
      infoWindow.close();
    });
  }
}