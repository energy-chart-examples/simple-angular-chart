import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Chart, { ChartConfiguration, DecimationAlgorithm, Tick, ChartDataset, ChartData } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { ChartView, LoaderService } from 'src/app/services/loader.service';




@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('lineCanvas') lineCanvas: ElementRef | undefined;
  @Input()
  power$ = new BehaviorSubject<ChartView>({
    min: 0,
    max: 0,
    title: 'no data',
    datasets: []
  });

  chart: any;
  datasets: ChartDataset[] = [
    {
      label: 'Dataset 1',
      data: [
        { x: 1000, y: 1 },
        { x: 2000, y: 1 },
        { x: 3000, y: 5 },
      ]
    },
    {
      label: 'Dataset 2',
      data: [
        { x: 1000, y: 1 },
        { x: 2000, y: 2 },
        { x: 3000, y: 8 },
      ]
    }
  ]
  config: ChartConfiguration = {
    type: 'line',
    data: {
      datasets: this.datasets,
    },
    options: {
      responsive: true,
      normalized: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          },
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            // Luxon format string
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y1: {
          stacked: true,
          title: {
            display: true,
            text: 'Power in MW'
          },
          position: 'left',
          beginAtZero: true
        },
        y2: {
          stacked: false,
          display: false,
          title: {
            display: true,
            text: 'Load in MW'
          },
          position: 'right',
          beginAtZero: true
        }

      }
    }
  };
  constructor(private loadPower: LoaderService) { }
  ngAfterViewInit() {
    this.loadPower.power$.subscribe((chartView: ChartView) => {
      console.log('JUHU', chartView)
      this.config.data.datasets = chartView.datasets;
      if (this.config.options?.plugins?.title) {
        this.config.options.plugins.title.text = chartView.title;
      }
      const y1 = this.config.options?.scales?.['y1'] as any

      const y2 = this.config.options?.scales?.['y2'] as any
      console.log('----', y1, y2, chartView)
      if (y1 && chartView.max !== undefined) {
        y1.suggestedMax = chartView.max;
      }
      if (y1 && chartView.min !== undefined) {
        y1.suggestedMin = chartView.min;
      }
      if (y2 && chartView.max !== undefined) {
        y2.suggestedMax = chartView.max;
      }
      if (y2 && chartView.min !== undefined) {
        y2.suggestedMin = chartView.min;
      }
      console.log(y1.suggestedMin, y1.suggestedMax);
      console.log(y2.suggestedMin, y2.suggestedMax);
      if (this.chart) {
        this.chart.destroy();
      }
      if (this.lineCanvas) {
        this.chart = new Chart(this.lineCanvas.nativeElement, this.config);
      }
    })

  }
}
