import { Injectable } from '@angular/core';
import { ElasticSearchService } from './elastic-search.service';
import * as crypto from 'crypto-js';
import { Observable, of } from 'rxjs';
import { promisify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboards = new Map<string, any>();

  constructor(private elasticSearchService: ElasticSearchService) { }

  getAllDashboards(): Observable<Map<string, any>> {
    this.elasticSearchService.sendRequest('GET', 'dashboards/_search').subscribe(data => {
      for (let hit of data.hits.hits) {
        this.dashboards.set(hit._id, hit._source);
      };
    });
    return of(this.dashboards);
  }

  getDashboard(id: string): Observable<any> {
    if (this.dashboards.has(id))
      return of({ found: true, _source: this.dashboards.get(id)});
    else
      return this.elasticSearchService.sendRequest('GET', 'dashboards/dashboard/' + id);
  }

  updateDashboard(id: string, dashboard: any) {
    this.elasticSearchService.sendRequest('PUT', 'dashboards/dashboard/' + id, JSON.stringify(dashboard)).subscribe(() => {
      this.dashboards.set(id, dashboard);
    });
  }

  deleteDashboard(id: string) {

    this.elasticSearchService.sendRequest('DELETE', 'dashboards/dashboard/' + id).subscribe(() => {
      if (this.dashboards.has(id))
        this.dashboards.delete(id);
    });
  }

  addDashboard(dashboard: any) {
    let timeStamp = Date.now().toString();
    let id = crypto.SHA256(timeStamp).toString();
    dashboard.timeStamp = timeStamp;

    this.dashboards.set(id, dashboard);
  }
}
