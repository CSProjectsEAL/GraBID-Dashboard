import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {
  }
}
