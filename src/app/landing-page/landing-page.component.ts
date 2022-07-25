import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StaticContent } from '../common/model/static-content.model';
import { CountryModel } from '../common/model/country-data.model';
import { DataPassingService } from '../common/service/data-passing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {
  showRegions: boolean = false;
  staticContent: StaticContent = new StaticContent();
  // countryModel: CountryModel = new CountryModel();
  countryList: CountryModel[] = [];
  error: boolean = false;
  constructor(public dataPassingService: DataPassingService) {}

  ngOnInit(): void {
    this.dataPassingService.getAllData().subscribe(
      (data) => {
        console.log(data);
        this.responseMapping(data);
      },
      (error) => {
        console.log(error);
        this.error = true;
      }
    );
    // console.log(this.dataPassingService.getCountryData('peru'))
  }

  regionToggle() {
    this.showRegions = !this.showRegions;
    console.log(this.showRegions);
  }

  regionSelect(e: any) {
    console.log(e.srcElement.innerText);
  }

  responseMapping(data: any) {
    data = data.sort((a, b) => {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });
    for (let i = 0; i < data.length; i++) {
      this.countryList.push(new CountryModel());
      this.countryList[i].country.name = data[i].name.common;
      this.countryList[i].country.image = data[i].flags.png;
      this.countryList[i].country.population = data[i].population;
      this.countryList[i].country.region = data[i].region;
      this.countryList[i].country.capital = data[i].capital;
    }
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
