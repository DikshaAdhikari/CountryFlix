import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataPassingService {
  endpoint: string = '';
  url = "https://restcountries.com/v3.1/";
  constructor(private http:HttpClient) { }

  getAllData(){
    this.endpoint = 'all'
    let all = this.url + this.endpoint;
    return this.http.get(all);
  }
  getCountryData(country: string){
    let countryURL = this.url + 'name/' + country;
    return this.http.get(countryURL)
  }
     
  
}
