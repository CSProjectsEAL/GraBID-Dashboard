import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dashboards: Map<string, any>;
  newDashboardName: string;
  addDashboard: boolean;

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit() {
    this.dashboardService.getAllDashboards().subscribe(data => this.dashboards = data);
  }

  private addNewDashboard(){
    let dashboard = {
      name: this.newDashboardName, timestamp: Date.now().toString(), elements: []
    };
    let id = this.dashboardService.addDashboard(dashboard);

    this.router.navigate(['/dashboard/' + id + '/edit']);
  }
}
