import { EChartOption } from 'echarts';
import { Colours } from '../../colors';

export abstract class PieChart {
  private static data =
    {
      legendData: [],
      seriesData: []
    };

  public static executeQuery(data: any): EChartOption {
    this.data.legendData = [];
    this.data.seriesData = [];
    let buckets = data.aggregations.pie.buckets;

    for (let key in buckets) {
      let bucket = buckets[key];
      let name = '';
      if (bucket.key_as_string) {
        name = bucket.key_as_string;
      }
      else {
        name = bucket.key;
      }
      this.data.legendData.push(name);

      this.data.seriesData.push({
        name: name,
        value: bucket.doc_count,
        label: {
          normal: {
            formatter: ['{d}%'].join()
          }
        }
      });
    }
    return this.getChartOption('asd');
  }

  private static getChartOption(name: string): EChartOption {
    return {
      color: Colours.GenerateColors(this.data.legendData.length),
      tooltip: {
        trigger: 'item',
        formatter: "Count - {c}"
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        top: 'middle',
        x: 'right',
        textStyle: { color: 'color', fontFamily: 'Open Sans', fontWeight: 'bold' },
        data: this.data.legendData
      },
      series: [
        {
          name: name,
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
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
  }
} 
