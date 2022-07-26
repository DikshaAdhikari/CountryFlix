import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StaticContent, DataList } from '../common/model/static-content.model';
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
  selectedRegion: string = '';
  dataList: DataList = new DataList();
  staticContent: StaticContent = new StaticContent();
  countryList: CountryModel[] = [];
  newList;
  error: boolean = false;
  constructor(public dataPassingService: DataPassingService) {}

  ngOnInit(): void {
    this.dataPassingService.getAllData().subscribe(
      (data) => {
        this.responseMapping(data);
      },
      (error) => {
        this.error = true;
      }
    );
  }

  regionToggle() {
    this.showRegions = !this.showRegions;
  }

  regionSelect(value) {
    this.countryList = this.newList;
    this.selectedRegion = value;
    if (value != "All"){
      this.countryList = this.countryList.filter(selected => selected.country.region === value);
    } else {
      return;
    }
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
    this.newList = this.countryList;
  }

  numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
