import { Injectable } from '@angular/core';
import { EChartOption } from 'echarts';
import { ElasticSearchService } from '../elastic-search.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PieService {
  data =
    {
      legendData: [],
      seriesData: []
    };

  constructor(private elasticSearchService: ElasticSearchService) { }

  executeQuery(query: string): Observable<EChartOption> {
    return this.elasticSearchService.sendRequest('GET', 'test/_search', query).pipe(map(data => {
      this.data.legendData = [];
      this.data.seriesData = [];
      let buckets = data.aggregations.pie.buckets;

      for (let key in buckets) {
        let bucket = buckets[key];
        this.data.legendData.push(bucket.key);

        this.data.seriesData.push({
          name: bucket.key,
          value: bucket.doc_count,
          label: {
            normal: {
              formatter: ['{d}%'].join()
            }
          }
        });
      }
      return this.getChartOption("asd");
    }));
  }

  private getChartOption(name: string): EChartOption {
    return {
      color: ['#06a87b', '#0684a8', '#047556', '#9bdcca', '#e6f6f1', '#50a8c2'],
      tooltip: {
        trigger: 'item',
        formatter: "Count - {c}"
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        top: 'middle',
        x: 'center',
        textStyle: { color: 'color', fontFamily: 'Open Sans', fontWeight: 'bold' },
        data: this.data.legendData
      },
      series: [
        {
          name: name,
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
  }
}
