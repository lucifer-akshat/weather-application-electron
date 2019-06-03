import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Config } from '../Config/apiRoute';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(
    private http: HttpClient
  ) { }

  APPID: any = '6e985a521d6f2057a15c6815b346201b';

  fetchWeatherDetails(cityName) {
    return this.http.get(Config.apiRoute + '?q=' + cityName + '&APPID=' + this.APPID);
  }
}
