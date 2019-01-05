import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ElasticSearchService } from '../elastic-search.service';
import { PieChart } from './pie/pieChart';
import { BarChart } from './bar/barChart';
import { ExpLineChart } from './exp-line/expLineChart';
import { EChartOption } from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  chartOptionData: Observable<{ query: string, options: EChartOption }>;
  private chartOptionDataUpdater = new Subject<{ query: string, options: EChartOption }>();

  constructor(private elasticSearchService: ElasticSearchService) {
    this.chartOptionData = this.chartOptionDataUpdater.asObservable();
  }


  generateOptions(query: string, type: string) {
    return this.elasticSearchService.sendRequest('GET', 'test/_search', query).subscribe(data => {
      let options = {};

      switch (type) {
        case 'pie': options = PieChart.executeQuery(data);
          break;
        case 'bar': options = BarChart.executeQuery(data);
          break;
        case 'expLine': options = ExpLineChart.executeQuery(data);
          break;
        default: options = null;
          break;
      }
      this.chartOptionDataUpdater.next({ query: query, options: options });
    });
  }

  getFields(): Observable<string[]> {
    return this.elasticSearchService.sendRequest('GET', 'test').pipe(map(data => {
      let properties = data.test.mappings.demo.properties;
      let fields = [];

      for (let property in properties) {
        let name = property;

        if (properties[property].fields)
          name += '.' + properties[property].fields.keyword.type;
        fields.push(name);
      }

      return fields;
    }));
  }

  getChartOptions(query: string, type: string): Observable<EChartOption> {
    return this.elasticSearchService.sendRequest('GET', 'test/_search', query).pipe(map(data => {
      let option = {};

      switch (type) {
        case 'pie': option = PieChart.executeQuery(data);
          break;
        case 'bar': option = BarChart.executeQuery(data);
          break;
        case 'expLine': option = ExpLineChart.executeQuery(data);
          break;
      }

      return option;
    }));
  }
}
