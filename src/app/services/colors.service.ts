import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  x = ['xAxisValues (Unix timestamp)', 
  'Hydro pumped storage consumption (MW)', 
  'Import Balance (MW)', 'Nuclear (MW)', 
  'Hydro Run-of-River (MW)', 
  'Biomass (MW)', 
  'Fossil brown coal / lignite (MW)', 
  'Fossil hard coal (MW)', 
  'Fossil oil (MW)', 'Fossil gas (MW)', 'Geothermal (MW)', 'Hydro water reservoir (MW)', 'Hydro pumped storage (MW)', 
  'Others (MW)', 'Waste (MW)', 'Wind offshore (MW)', 'Wind onshore (MW)', 'Solar (MW)', 'Load (MW)', 'Residual load (MW)', 
  'Renewable share of generation (%)', 'Renewable share of load (%)']
  colors:any = {
    "Biomass (MW)": "#008000",
    "Fossil brown coal / lignite (MW)": "brown",
    "B03": "#ff8c00",
    "Fossil gas (MW)": "#f59705",
    "Fossil hard coal (MW)": "#000000",
    "Fossil oil (MW)": "#ee209f",
    "B07": "#7d7a00",
    "B08": "#6c6a43",
    "B09": "#196fd7",
    "Hydro pumped storage (MW)": "blue",
    "Hydro pumped storage consumption (MW)": "blue",
    "Hydro Run-of-River (MW)": "#2289f2",
    "Hydro water reservoir (MW)": "#1e7ce5",
    "B13": "#7e7ce5",
    "Nuclear (MW)": "red",
    "B15": "#008000",
    "Solar (MW)": "#fcd440",
    "Waste (MW)": "#004000",
    "Wind offshore (MW)": "#7bf4ff",
    "Wind onshore (MW)": "#77d8fe",
    "Load (MW)": "black",
    "Residual load (MW)": "black",
    "B20": "#006e24",
    "X72": "blue"
  };
  constructor() { }
  makeColor(type:string):string|undefined {
    return this.colors[type];
  }
}
