import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { ColorsService } from './colors.service';
import { CountriesService } from './countries.service';

interface EnergyChartsPower {
  [key: string]: number[]
}
interface Item {
  x: number;
  y: number;
}
export interface ChartView {
  min: number;
  max: number;
  title: string;
  datasets: ChartDataset[]
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  power$ = new BehaviorSubject<ChartView>({
    min: 0,
    max: 0,
    title: 'no data',
    datasets: []
  });
  rightAxis: string[] = ['Load (MW)', 'Residual load (MW)'];
  exclude: string[] = ['Residual load (MW)', 'Import Balance (MW)'];
  constructor(private httpClient: HttpClient, private colorService: ColorsService, private coutriesService: CountriesService) { }
  loadPower(country: string, year: number, month: number) {
    // const url = '/api/power?country=de&start=2022-10-19T00%3A00Z&end=2022-10-27T00%3A00Z';
    // const url = '/api/power?country=at&start=2021-01-01T00%3A00Z&end=2021-02-01T00%3A00Z';
    const start = startOfMonth(new Date(year, month - 1, 1, 0, 0, 0))
    const end = endOfMonth(new Date(year, month - 1, 1, 0, 0, 0))
    const url = `/api/power?country=${country}&start=${start.toISOString()}&end=${end.toISOString()}`;
    const title = this.makeTitle(country, year, month);
    this.httpClient.get(url).subscribe(data => {
      this.chartData(data as EnergyChartsPower, title);
    })
  }

  chartData(energyChartsPower: EnergyChartsPower, title: string) {
    const datasets: ChartDataset[] = []
    const maxArray: number[] = [];
    const minArray: number[] = [];
    for (var key of Object.keys(energyChartsPower)) {
      if (key.endsWith(' (MW)') && !this.exclude.includes(key)) {
        const data: Item[] = [];
        let yAxisID = 'y1';
        let fill = true;
        let order = 3;
        if (this.rightAxis.includes(key)) {
          yAxisID = 'y2';
          fill = false;
          order = 2;
        }
        energyChartsPower['xAxisValues (Unix timestamp)'].forEach((time, i) => {
          const y = energyChartsPower[key][i]
          const x = time * 1000;
          data.push({
            x: x,
            y: y
          })
          if (yAxisID === 'y1') {
            let maxX = maxArray[i] || 0
            let minX = minArray[i] || 0
            if (y > 0) {
              maxX += y
            } else {
              minX += y
            }
            maxArray[i] = maxX
            minArray[i] = minX
          }
        })

        const label = key.substring(0, key.indexOf('('));;
        const dataset: ChartDataset = {
          label: label,
          data: data,
          pointRadius: 0,
          borderWidth: 1,
          fill: fill,
          yAxisID: yAxisID,
          order: order
        }
        const color = this.colorService.makeColor(key);
        if (color) {
          dataset.backgroundColor = color;
          dataset.borderColor = color;
        }
        datasets.push(dataset)
      }
    }
    const max = Math.max(...maxArray);
    const min = Math.min(...minArray);
    this.power$.next({
      min: min * 1.05,
      max: max * 1.05,
      title: title,
      datasets: datasets
    })
  }
  makeTitle(country: string, year: number, month: number): string {
    const countries = this.coutriesService.getCountries();
    const countryName = countries.find(item => item.code === country)?.name || '';
    const date = new Date(year, month - 1, 1, 0, 0, 0);
    const monthName = format(date, 'LLLL');

    return `${countryName} ${year} ${monthName}`
  }
}
