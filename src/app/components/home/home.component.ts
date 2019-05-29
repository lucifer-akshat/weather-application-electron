import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(this.processGeolocationPosition);
  }

  processGeolocationPosition(position) {
    console.log(position.coords.latitude, position.coords.longitude);
  }

}

