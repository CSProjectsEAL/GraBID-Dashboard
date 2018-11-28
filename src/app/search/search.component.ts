import { Component, OnInit } from '@angular/core';
import { ElasticSearchService } from '../elastic-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  request: string = `GET _search
  {
    "query": {
      "match_all": {
        "count": 12,
        "text": "one"
      }
    }
  }`;

  response: string;

  options:any = {printMargin: false};

  constructor(private elasticService: ElasticSearchService) {
   }

  ngOnInit() {
  }
}

