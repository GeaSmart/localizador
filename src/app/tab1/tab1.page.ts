import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [
    Geolocation
  ]
})
export class Tab1Page {

  //constructor() {}
  constructor(private geolocation: Geolocation) {
    this.locate();
  }

  latitud;
  longitud


  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;
      // resp.coords.latitude
      // resp.coords.longitude      
     }).catch((error) => {
       console.log('Error getting location', error);
       this.latitud = "-";
       this.longitud = "-";
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
    }

}
