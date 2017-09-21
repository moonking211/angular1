import {Component} from '@angular/core';

import {MyChartService} from './myChart.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'my-chart',
  templateUrl: './myChart.html',
  styleUrls: ['./myChart.scss']
})

// TODO: move chart.js to it's own component
export class MyChart {

  public doughnutData: Array<Object>;

  constructor(private myChartService:MyChartService) {
    this.doughnutData = myChartService.getData();
  }

  ngAfterViewInit() {
    this._loadDoughnutCharts();
  }

  private _loadDoughnutCharts() {
    let el = jQuery('.mychart-area').get(0) as HTMLCanvasElement;
    new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
      segmentShowStroke: false,
      percentageInnerCutout : 64,
      responsive: true
    });
  }
}
