import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dashboards: Map<string, any>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    $(document).ready(function(){
      $('#addTxt').click(function(){
        $('.add-dashboard-form .hide-element').show();
        $('#addTxt').hide();
      });
    });

    this.dashboardService.getAllDashboards().subscribe(data => this.dashboards = data);
  }

  redirectToDashboard(name: string){
    console.log(name);
  }
}
