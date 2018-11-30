import { Component, OnInit } from '@angular/core';
import { ElasticSearchService } from '../elastic-search.service';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dashboardNames: any[] = [];

  constructor(private elasticSearchService: ElasticSearchService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('#addTxt').click(function(){
        $('.add-dashboard-form .hide-element').show();
        $('#addTxt').hide();
      });
    });

    
    this.elasticSearchService.sendRequest('GET', 'dashboards/_search').subscribe(data => {
      for (let hit of data.hits.hits){
        this.dashboardNames.push({name: hit._source.name, id: hit._id});
      };
    });
  }

  redirectToDashboard(name: string){
    console.log(name);
  }
}
