import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ElasticSearchService } from '../elastic-search.service';
import { DashboardService } from '../dashboard.service';
import { ChartService } from '../chart-types/chart.service';


@Component({
  selector: 'app-dashboard-element',
  templateUrl: './dashboard-element.component.html',
  styleUrls: ['./dashboard-element.component.css']
})
export class DashboardElementComponent implements OnInit {
  element: any = {};
  type: string;
  field: string;
  orderBy: string = "_count";
  order: string = "desc";
  chartOption: EChartOption;
  fields: string[] = [];
  add: boolean = false;
  properties: any = null;
  subscription = this.chartService.chartOptionData.subscribe(data => {
    if (this.element != null) {
      this.element.query = data.query;
      this.chartOption = data.options;
    }
  });

  constructor(private dashboardService: DashboardService, private chartService: ChartService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.add = this.route.snapshot.paramMap.get('id') == 'add';
    this.element = JSON.parse(JSON.stringify(this.dashboardService.getAndSetCurrentElement(this.route.snapshot.paramMap.get('id'))));

    if (this.element == null)
      this.router.navigate(['404/1']);
    else {
      this.chartService.generateOptions(this.element.query, this.element.type);
      this.type = this.element.type;
      this.properties = this.element.properties;
    }
  }

  private saveElement() {
    this.location.back();
    this.element.properties = this.properties;
    this.dashboardService.updateElement(this.element, this.add);
  }

  private goBack() {
    this.location.back();
  }

  private changeType(type: string) {
    this.type = type;
    this.element.type = type;
    this.properties = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
