import { Component, OnInit } from '@angular/core';
import { ElasticSearchService } from '../elastic-search.service';
import { TemplateQueriesService } from '../template-queries.service';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  request: string;
  response: string;
  queries: any[] = [];

  options: any = { printMargin: false};

  constructor(private elasticService: ElasticSearchService, private templateService: TemplateQueriesService) {
  }

  ngOnInit() {
    this.templateService.getQueries().forEach((value, nameKey) => {
      this.queries.push({key: nameKey, displayName: value.displayName});
    });
  }

  sendRequest() {
    var regex = /^([\w\-]+)(.+)/;
    var match = regex.exec(this.request);
    var newLinePos = this.request.indexOf('\n');
    var requestBody;

    if(newLinePos > 0)
      requestBody = this.request.substring(newLinePos).trim();
    else
      requestBody = null;

    this.elasticService.sendRequest(match[1], match[2], requestBody).subscribe(response => this.response = JSON.stringify(response, null, '  '));
  }
  
  presetClick(queryKey: string) {
    this.request = this.templateService.getQuery(queryKey).query;
  }
}