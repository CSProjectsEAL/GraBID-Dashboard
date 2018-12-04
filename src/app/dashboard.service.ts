import { Injectable } from '@angular/core';
import { ElasticSearchService } from './elastic-search.service';
import * as crypto from 'crypto-js';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboards = new Map<string, any>();
  currentDashboard: any = {};
  currentElement: any = {};

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
      return of({ found: true, _source: this.dashboards.get(id) });
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

  addDashboard(dashboard: any): string {
    let id = crypto.SHA256(dashboard.timeStamp).toString();
    this.dashboards.set(id, dashboard);
    this.updateDashboard(id, dashboard);

    return id;
  }

  getAndSetCurrentElement(id: string): any {
    this.currentElement = null;

    if (this.currentDashboard.elements) {
      for (let element of this.currentDashboard.elements) {
        if (id == element.id)
          this.currentElement = element;
      }
    }

    return this.currentElement;
  }

  updateElement(element: any) {
    let elements = this.currentDashboard.elements;
    for (let i in elements)
      if (elements[i].id == element.id)
        elements[i] = element;

    console.log(this.currentDashboard);
  }
}
