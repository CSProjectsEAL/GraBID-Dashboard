import { EChartOption } from 'echarts';

export abstract class BarChart {
   private static data =
    {
      xAxisData: [],
      seriesData: []
    };

  public static executeQuery(data: any): EChartOption {
      this.data.xAxisData = [];
      this.data.seriesData = [];
      let buckets = data.aggregations.pie.buckets;

      for (let key in buckets) {
        let bucket = buckets[key];
        this.data.xAxisData.push(bucket.key);

        this.data.seriesData.push(bucket.doc_count);
      }
      return this.getChartOption("asd");
  }

  private static getChartOption(name: string): EChartOption {
    return {
      xAxis: {
          type: 'category',
          data: this.data.xAxisData,
          axisLine: {
            lineStyle: { color: 'white' }
        }
      },
      yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: { color: 'white' }
        }
      },
      series: [{
          data: this.data.seriesData,
          type: 'bar'
      }]
  };
  }
} 
