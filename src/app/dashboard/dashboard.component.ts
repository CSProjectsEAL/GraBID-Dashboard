import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DndListEvent } from '@fjsc/ng2-dnd-list';
import { Location } from '@angular/common';

import { ElasticSearchService } from '../elastic-search.service';
import { DashboardService } from '../dashboard.service';
import { PieChart } from '../chart-types/pie/pieChart';
import { BarChart } from '../chart-types/bar/barChart';
import { ExpLineChart } from '../chart-types/exp-line/expLineChart';

declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    dashboard: any = {};
    dashboardId: string;
    editMode: boolean;
    isNameInvalid: boolean;
    dataLoaded: boolean;
    lastIndex: number;
    chartOptions = new Map<string, EChartOption>();

    subscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
        this.dashboardId = this.route.snapshot.paramMap.get('id');
        this.refreshDashboardData(this.dashboardId);
    });

    constructor(private route: ActivatedRoute, private elasticSearchService: ElasticSearchService, private dashboardService: DashboardService, private router: Router, private location: Location) { }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private refreshDashboardData(id: string) {
        this.dashboardService.getDashboard(id).subscribe(data => {
            if (data.found == false) {
                this.router.navigate(['/404/2']);
                this.subscription.unsubscribe();
            }
            else {
                this.dataLoaded = true;
                let dashboard = data._source;
                this.dashboard = dashboard;
                this.dashboard.elements.sort(this.compareElements);

                let elements = this.dashboard.elements;
                for (let i in elements) {
                    this.elasticSearchService.sendRequest('GET', 'test/_search', elements[i].query).subscribe(data => {
                        switch (elements[i].type) {
                            case 'pie': this.chartOptions.set(elements[i].id, PieChart.executeQuery(data));
                                break;
                            case 'bar': this.chartOptions.set(elements[i].id, BarChart.executeQuery(data));
                                break;
                            case 'expLine': this.chartOptions.set(elements[i].id, ExpLineChart.executeQuery(data));
                                break;
                        }
                    });
                }

                if (this.route.snapshot.paramMap.get('mode') == 'edit') {
                    this.editMode = true;
                    if (this.dashboardService.dashboardSnapshot == null) {
                        this.dashboardService.dashboardSnapshot = JSON.parse(JSON.stringify(this.dashboard));
                    }
                }
                this.dashboardService.currentDashboard = this.dashboard;
            }
        });
    }

    private compareElements(a: any, b: any): number {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    }

    private deleteDashboard() {
        this.dashboardService.deleteDashboard(this.dashboardId);
        this.router.navigate(['/404/2']);
    }

    private saveDashboard() {
        this.dashboardService.updateDashboard(this.dashboardId, this.dashboard);
        this.router.navigate(['/dashboard/' + this.dashboardId]);
    }

    private goBack() {
        this.dashboardService.cancelEdit(this.dashboardId);
        this.location.back();
    }

    private deleteElement(index: number) {
        this.dashboard.elements.splice(index, 1);
        let order: number = 0;

        for (let element of this.dashboard.elements) {
            element.order = order;
            order++;
        }
    }

    private moved(index: number, list: any[]) {
        let order = 0;
        list.splice(index, 1);
        for (let li of list) {
            li.order = order;
            order++;
        }
    }

    private onDrop(event: DndListEvent) {
        this.lastIndex = event.index;
    }

    private navigateToEditMode() {
        this.router.navigate(['/dashboard/' + this.dashboardId + '/edit']);
    }

    private editElement(id: string) {
        this.router.navigate(['/edit-element/' + id]);
    }

    private addElement() {
        this.router.navigate(['/edit-element/add']);
    }
}
