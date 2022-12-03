import { Injectable } from '@angular/core';

export interface Country {
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class CountriesService {
  countries: Country[] = [
    {
      "code": "de",
      "name": "Germany"
    },
    {
      "code": "ch",
      "name": "Switzerland"
    },
    {
      "code": "eu",
      "name": "EuropeanUnion"
    },
    {
      "code": "all",
      "name": "Europe"
    },
    {
      "code": "al",
      "name": "Albania"
    },
    {
      "code": "am",
      "name": "Armenia"
    },
    {
      "code": "at",
      "name": "Austria"
    },
    {
      "code": "az",
      "name": "Azerbaijan"
    },
    {
      "code": "ba",
      "name": "Bosnia-Herzegovina"
    },
    {
      "code": "be",
      "name": "Belgium"
    },
    {
      "code": "by",
      "name": "Belarus"
    },
    {
      "code": "cy",
      "name": "Cyprus"
    },
    {
      "code": "cz",
      "name": "CzechRepublic"
    },
    {
      "code": "dk",
      "name": "Denmark"
    },
    {
      "code": "ee",
      "name": "Estonia"
    },
    {
      "code": "es",
      "name": "Spain"
    },
    {
      "code": "fi",
      "name": "Finland"
    },
    {
      "code": "fr",
      "name": "France"
    },
    {
      "code": "ge",
      "name": "Georgia"
    },
    {
      "code": "gr",
      "name": "Greece"
    },
    {
      "code": "hr",
      "name": "Croatia"
    },
    {
      "code": "hu",
      "name": "Hungary"
    },
    {
      "code": "ie",
      "name": "Ireland"
    },
    {
      "code": "lt",
      "name": "Lithuania"
    },
    {
      "code": "lu",
      "name": "Luxembourg"
    },
    {
      "code": "lv",
      "name": "Latvia"
    },
    {
      "code": "md",
      "name": "Moldova"
    },
    {
      "code": "me",
      "name": "Montenegro"
    },
    {
      "code": "mk",
      "name": "NorthMacedonia"
    },
    {
      "code": "mt",
      "name": "Malta"
    },
    {
      "code": "nie",
      "name": "NorthIreland"
    },
    {
      "code": "nl",
      "name": "Netherlands"
    },
    {
      "code": "no",
      "name": "Norway"
    },
    {
      "code": "pl",
      "name": "Poland"
    },
    {
      "code": "pt",
      "name": "Portugal"
    },
    {
      "code": "ro",
      "name": "Romania"
    },
    {
      "code": "rs",
      "name": "Serbia"
    },
    {
      "code": "ru",
      "name": "Russia"
    },
    {
      "code": "se",
      "name": "Sweden"
    },
    {
      "code": "sl",
      "name": "Slovenia"
    },
    {
      "code": "sk",
      "name": "SlovakRepublic"
    },
    {
      "code": "tr",
      "name": "Turkey"
    },
    {
      "code": "ua",
      "name": "Ukraine"
    },
    {
      "code": "uk",
      "name": "UnitedKingdom"
    },
    {
      "code": "xk",
      "name": "Kosovo"
    }
  ]
  constructor() { }
  getCountries():Country[] {
    return this.countries;
  }
}
