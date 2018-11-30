import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const errorMessages = new Map<number, string>();
errorMessages.set(1, 'Page not found!');
errorMessages.set(2, 'Dashboard not found!');

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  errorMsg: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (errorMessages.has(+this.route.snapshot.paramMap.get('id')))
      this.errorMsg = errorMessages.get(+this.route.snapshot.paramMap.get('id'));
  }
}
