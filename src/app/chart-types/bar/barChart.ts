import { EChartOption } from 'echarts';

export abstract class BarChart {
  private static data =
    {
      xAxisData: [],
      seriesData: new Map()
    };

  public static executeQuery(data: any): EChartOption {
    this.data.xAxisData = [];
    this.data.seriesData = new Map<string, { name: string, type: string, barGap: number, data: [] }[]>();
    let buckets = data.aggregations.bar.buckets;

    if (buckets[0].barFilters) {
      let bucketFilters = buckets[0].barFilters.buckets;
      for (let property in bucketFilters) {
        this.data.seriesData.set(property, { name: property, type: 'bar', barGap: 0, data: [] });
      }

      for (let i in buckets) {
        bucketFilters = buckets[i].barFilters.buckets;
        let bucket = buckets[i];

        if (bucket.key_as_string) {
          this.data.xAxisData.push(bucket.key_as_string);
        }
        else{
          this.data.xAxisData.push(bucket.key);
        }

        for (let property in bucketFilters)
          this.data.seriesData.get(property).data.push(bucketFilters[property].doc_count);
      }
    }
    else {
      let seriesDataArray = [];

      for (let i in buckets) {
        let bucket = buckets[i];

        if (bucket.key_as_string) {
          this.data.xAxisData.push(bucket.key_as_string);
        }
        else{
          this.data.xAxisData.push(bucket.key);
        }
        
        seriesDataArray.push(bucket.doc_count);
      }

      this.data.seriesData.set('noFilter', { name: 'Count', type: 'bar', barGap: 0, data: seriesDataArray });
    }
    return this.getChartOption();
  }

  private static getChartOption(): EChartOption {
    return {
      color: ['#06a87b', '#0684a8', '#047556', '#9bdcca', '#e6f6f1', '#50a8c2'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        textStyle: { color: 'color', fontFamily: 'Open Sans', fontWeight: 'bold' },
        data: Array.from(this.data.seriesData.keys())
      },
      xAxis: {
        type: 'category',
        axisTick: { show: false },
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
      series: Array.from(this.data.seriesData.values())
    };
  }
}
