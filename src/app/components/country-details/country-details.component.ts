import { Component, OnInit } from '@angular/core';
import { StaticContent } from '../../common/model/static-content.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryModel } from '../../common/model/country-data.model';
import { DataPassingService } from 'src/app/common/service/data-passing.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  staticContent: StaticContent = new StaticContent();
  countryModel: CountryModel = new CountryModel();
  userId;
  constructor(private router: Router,
    private route: ActivatedRoute, 
    public dataPassingService: DataPassingService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);
    
    this.dataPassingService.getCountryData(this.userId).subscribe(
      (data) => {
        console.log(data);
        this.responseMapping(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBack(){
    this.router.navigate(['/countries']);
  }

  responseMapping(data: any) {
    data = data.filter(e=>e.name === this.userId)
    this.countryModel.country.name = this.dataPassingService.getValidData(data[0].name);
    this.countryModel.country.image = this.dataPassingService.getValidData(data[0].flags.png);
    this.countryModel.country.population = this.dataPassingService.getValidData(data[0].population);
    this.countryModel.country.region = this.dataPassingService.getValidData(data[0].region);
    this.countryModel.country.capital = this.dataPassingService.getValidData(data[0].capital);
    this.countryModel.country.nativeName = this.dataPassingService.getValidData(data[0].nativeName);
    this.countryModel.country.subregion = this.dataPassingService.getValidData(data[0].subregion);
    this.countryModel.country.topLevelDomain = this.dataPassingService.getValidData(data[0].topLevelDomain);
    this.countryModel.country.currencies = (this.dataPassingService.getValidData(data[0].currencies)) != 'N.A' ? this.dataPassingService.getValidData(data[0].currencies).map(elem=>elem.name) : 'N.A';
    this.countryModel.country.languages = (this.dataPassingService.getValidData(data[0].languages)) != 'N.A' ? this.dataPassingService.getValidData(data[0].languages).map(elem=>elem.name) : 'N.A';
  }
}
