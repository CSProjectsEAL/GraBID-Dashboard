import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chartOption: EChartOption = {
    xAxis: {
        type: 'category',
        data: ['RENEWAL', 'STARTUP', 'TERMINATION', 'CHANGE']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [14687,13342,4644,2049],
        type: 'bar'
    }]
 };

 chartOption2: EChartOption = {
  xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
  }]
};

  constructor() { }

  ngOnInit() {
  }

}
