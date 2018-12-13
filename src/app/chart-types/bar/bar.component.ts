import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartService } from '../chart.service';

const esb = require('elastic-builder');

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  @Input('properties') set setValue(value){
    this.properties = value;
    console.log(value);
  }
  @Output('propertiesChange') emitter: EventEmitter<any> = new EventEmitter<any>();

  field: string;
  orderBy: string = '_count';
  order: string = 'desc';
  fields: string[] = [];
  filter: string;
  filters: string[] = [];
  properties: any = null;

  constructor(private chartService: ChartService) { }

  ngOnInit() {
    this.chartService.getFields().subscribe(data => this.fields = data);

    if(this.properties != null && this.properties != undefined)
    {
      console.log('GOT HERE');
      this.field = this.properties.field;
      this.orderBy = this.properties.orderBy;
      this.order = this.properties.order;
      this.filters = this.properties.filters;
    }
  }

  private refreshData(){
    this.emitter.emit({field: this.field, orderBy: this.orderBy, order: this.order, filters: this.filters});

    let termAgg = esb.termsAggregation('bar', this.field).size(5).order(this.orderBy, this.order);

    if (this.filters.length > 0) {
      let filterAgg = esb.filtersAggregation('barFilters');
      for (let i in this.filters) {
        if (this.filters[i] == '*')
          filterAgg = filterAgg.filter('*', esb.matchAllQuery());
        else
          filterAgg = filterAgg.filter(this.filters[i], esb.queryStringQuery(this.filters[i]));
      }

      termAgg = termAgg.agg(filterAgg);
    }

    let query = JSON.stringify(esb.requestBodySearch().agg(termAgg).size(0).toJSON());
    this.chartService.generateOptions(query, 'bar');
  }

  private addFilter() {
    this.filters.push(this.filter);
    this.filter = '';
  }

  private deleteFilter(index: number) {
    this.filters.splice(index, 1);
  }

}
