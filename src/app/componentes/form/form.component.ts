import { Component, OnInit } from '@angular/core';
import { CountriesService, Country } from 'src/app/services/countries.service';
import { FormControl, FormGroup } from '@angular/forms';
import { endOfMonth, format, formatDistance, formatRelative, startOfMonth, subDays } from 'date-fns'
import { LoaderService } from 'src/app/services/loader.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit  {
  countries: Country[] = [];
  year = 2022;
  month = 11;
  country = 'de';
  loadForm = new FormGroup({
    country: new FormControl(this.country),
    year: new FormControl(this.year),
    month: new FormControl(this.month),
  });
  constructor(private countriesService:CountriesService, private loadService: LoaderService) {}
  ngOnInit() {
    this.countries = this.countriesService.getCountries();
    this.loadService.loadPower(this.country, this.year, this.month);
  }
  load() {
    console.log(this.loadForm.value);
    const year = this.loadForm.value.year || 2022;
    const month = this.loadForm.value.month || 1;
    const country = this.loadForm.value.country || 'de';
    this.loadService.loadPower(country, year, month);
    return false;
  }
}
