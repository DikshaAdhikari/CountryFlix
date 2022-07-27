import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataPassingService {
  endpoint: string = '';
  url = "https://restcountries.com/v2/";
  constructor(private http:HttpClient) { }

  isNullorUndefined(value){
    return (value === null || value === undefined);
  }

  getValidData(value){
    return this.isNullorUndefined(value) ? 'N.A': value;
  }

  getAllData(){
    this.endpoint = 'all'
    let all = this.url + this.endpoint;
    return this.http.get(all);
  }

  getRegionData(region: string){
    let regionURL = this.url + 'region/' + region;
    return this.http.get(regionURL)
  }

  getCountryData(country: string){
    let countryURL = this.url + 'name/' + country;
    return this.http.get(countryURL)
  }
     
  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  
}
