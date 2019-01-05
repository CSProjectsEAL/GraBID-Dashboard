import { EChartOption } from 'echarts';
import * as ecStat from 'echarts-stat';
import { Colours } from '../../colors';

export abstract class ExpLineChart {
  private static data = [];
  private static xAxisData = [];

  public static executeQuery(data: any): EChartOption {
    this.data = [];
    this.xAxisData = [];
    let count = 0;
    let buckets = data.aggregations.expLine.buckets;

    for (let key in buckets) {
      let bucket = buckets[key];

      if (bucket.key_as_string) {
        this.xAxisData.push(bucket.key_as_string);
      }
      else{
        this.xAxisData.push(bucket.key);
      }

      this.data.push([count, bucket.doc_count]);
      count++;
    }
    return this.getChartOption("asd");
  }

  private static getChartOption(name: string): EChartOption {
    // See https://github.com/ecomfe/echarts-stat
    var myRegression = ecStat.regression('exponential', this.data, null);

    myRegression.points.sort(function (a, b) {
      return a[0] - b[0];
    });

    return {
      color: Colours.GenerateColors(1),
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        },
        showContent: false
      },
      xAxis: {
        type: 'category',
        data: this.xAxisData,
        axisLine: {
          lineStyle: { color: 'white' }
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLine: {
          lineStyle: { color: 'white' }
        }
      },
      series: [{
        name: 'scatter',
        type: 'scatter',
        itemStyle: {
          color: 'transparent'
        },
        label: {
          emphasis: {
            show: true,
            position: 'left',
            textStyle: {
              color: 'white',
              fontSize: 20,
              backgroundColor: 'grey',
              borderWidth: 1,
              borderRadius: 5,
              padding: 5
            }
          }
        },
        data: this.data
      }, {
        name: 'line',
        type: 'line',
        showSymbol: true,
        smooth: true,
        data: myRegression.points,
        markPoint: {
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          data: [{
            coord: myRegression.points[myRegression.points.length - 1]
          }]
        }
      }]
    };
  }
} 
