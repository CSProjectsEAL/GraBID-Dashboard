import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

import { ElasticSearchService } from '../elastic-search.service';
import { DashboardService } from '../dashboard.service';
import { PieService } from "../chart-types/pie.service";

const esb = require('elastic-builder');

@Component({
  selector: 'app-dashboard-element',
  templateUrl: './dashboard-element.component.html',
  styleUrls: ['./dashboard-element.component.css']
})
export class DashboardElementComponent implements OnInit {
  element: any = {};
  field: string;
  orderBy: string = "_count";
  order: string = "desc";
  chartOption: EChartOption;
  fields: string[] = [];

  constructor(private dashboardService: DashboardService, private elasticSearchService: ElasticSearchService, private pieService: PieService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.element = this.dashboardService.getAndSetCurrentElement(this.route.snapshot.paramMap.get('id'));
    this.elasticSearchService.sendRequest('GET', 'test').subscribe(data =>{
      let properties = data.test.mappings.demo.properties;

      for (let property in properties){
        let name = property;

        if(properties[property].fields)
          name += '.' + properties[property].fields.keyword.type;
        this.fields.push(name);
      }
    });

    if (this.element == null)
      this.router.navigate(['404/1']);
    else
      this.refreshData(this.element.query);

  }

  refreshData(query: string) {
    switch (this.element.type){
      case 'pie': this.pieService.executeQuery(query).subscribe(data => this.chartOption = data);
      break;
    }
  }

  private refreshPreview(){
    let agg = esb.termsAggregation('pie', this.field).size(5).order(this.orderBy, this.order);
    let query = JSON.stringify(esb.requestBodySearch().agg(agg).size(0).toJSON());

    this.element.query = query;

    this.refreshData(query);
  }

  private saveElement(){
    this.location.back();
    this.dashboardService.updateElement(this.element);
  }

}
