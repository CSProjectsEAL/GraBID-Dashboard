import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  text: string = 'afsdsa';
  options:any = {maxLines: 500, printMargin: false};

  constructor() {
   }

  ngOnInit() {
  }
}
