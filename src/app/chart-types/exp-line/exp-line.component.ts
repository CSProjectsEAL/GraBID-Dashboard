import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartService } from '../chart.service';

const esb = require('elastic-builder');

@Component({
  selector: 'app-exp-line',
  templateUrl: './exp-line.component.html',
  styleUrls: ['./exp-line.component.css']
})
export class ExpLineComponent implements OnInit {
  @Input('properties') set setValue(value){
    this.properties = value;
    console.log(value);
  }
  @Output('propertiesChange') emitter: EventEmitter<any> = new EventEmitter<any>();

  field: string;
  orderBy: string = '_count';
  order: string = 'desc';
  fields: string[] = [];
  properties: any = null;

  constructor(private chartService: ChartService) {
    this.chartService.getFields().subscribe(data => this.fields = data);
  }

  ngOnInit() {
    if(this.properties != null && this.properties != undefined)
    {
      this.field = this.properties.field;
      this.orderBy = this.properties.orderBy;
      this.order = this.properties.order;
    }
  }

  private refreshData() {
    this.emitter.emit({field: this.field, orderBy: this.orderBy, order: this.order});

    let termAgg = esb.termsAggregation('expLine', this.field).size(5).order(this.orderBy, this.order);
    let query = JSON.stringify(esb.requestBodySearch().agg(termAgg).size(0).toJSON());
    this.chartService.generateOptions(query, 'expLine');
  }
}
