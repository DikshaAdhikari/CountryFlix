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
    let all = this.url + 'all';
    return this.http.get(all);
  }
  getCountryData(country: string){
    // debugger
    let countryURL = this.url + 'name/' + country;

    // return (countryURL)
    return this.http.get(countryURL)
  }
     
  
}
