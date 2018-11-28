import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-dashboard-element',
  templateUrl: './dashboard-element.component.html',
  styleUrls: ['./dashboard-element.component.css']
})
export class DashboardElementComponent implements OnInit {
  data =
    {
      legendData: ["TERMINATION", "STARTUP", "RENEWAL", "CHANGE", "OTHER"],
      seriesData: [{
        name: "TERMINATION",
        value: 45,
        label: {
          normal: {
            formatter: ['45%'].join()
          }
        }
      }, {
        name: "STARTUP",
        value: 27,
        label: {
          normal: {
            formatter: ['27%'].join()
          }
        }
      }, {
        name: "RENEWAL",
        value: 13,
        label: {
          normal: {
            formatter: ['13%'].join()
          }
        }
      }, {
        name: "CHANGE",
        value: 10,
        label: {
          normal: {
            formatter: ['10%'].join()
          }
        }
      }, {
        name: "OTHER",
        value: 5,
        label: {
          normal: {
            formatter: ['5%'].join()
          }
        }
      }]
    };

    chartOption: EChartOption = {
    color : ['#06a87b', '#0684a8', '#047556', '#9bdcca', '#e6f6f1', '#50a8c2'],
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {d}%"
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      top: 'middle',
      x: 'center',
      textStyle: {color: 'color', fontFamily: 'Open Sans', fontWeight: 'bold'},
      data: this.data.legendData
    },
    series: [
      {
        name: 'Subscription Type',
        type: 'pie',
        radius: '55%',
        center: ['30%', '50%'],
        data: this.data.seriesData,
        emphasis: {
          itemStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 20,
            shadowOffsetX: 0
          }
        }
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
