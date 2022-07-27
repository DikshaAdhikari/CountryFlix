import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StaticContent, DataList } from '../../common/model/static-content.model';
import { CountryModel } from '../../common/model/country-data.model';
import { DataPassingService } from '../../common/service/data-passing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {
  showRegions: boolean = false;
  selectedRegion: string = '';
  searchData: string = '';
  dataList: DataList = new DataList();
  staticContent: StaticContent = new StaticContent();
  countryList: CountryModel[] = [];
  newList;
  error: boolean = false;
  listError: boolean = false;
  constructor(public dataPassingService: DataPassingService) {}

  ngOnInit(): void {
    this.dataPassingService.getAllData().subscribe(
      (data) => {
        this.responseMapping(data);
        console.log(data)
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
    if (this.selectedRegion != value) {
      this.searchData = '';
    }
    this.selectedRegion = value;
    if (value != 'All' && value != '') {
      this.countryList = this.countryList.filter(
        (selected) => selected.country.region === value
      );
      return this.countryList;
    } else {
      return this.countryList;
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
      this.countryList[i].country.name = this.dataPassingService.getValidData(data[i].name);
      this.countryList[i].country.image = this.dataPassingService.getValidData(data[i].flags.png);
      this.countryList[i].country.population = this.dataPassingService.getValidData(data[i].population);
      this.countryList[i].country.region = this.dataPassingService.getValidData(data[i].region);
      this.countryList[i].country.capital = this.dataPassingService.getValidData(data[i].capital);
    }
    this.newList = this.countryList;
  }

  onSearch(input) {
    this.listError = false;
    this.countryList = this.regionSelect(this.selectedRegion).filter(
      (selected) =>
        selected.country.name.toLowerCase().includes(input.toLowerCase())
    );
    if (this.countryList.length === 0) {
      this.listError = true;
    }
  }
}
