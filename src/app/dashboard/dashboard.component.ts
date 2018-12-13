import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ElasticSearchService } from '../elastic-search.service';
import { filter } from 'rxjs/operators';
import { DndListEvent } from '@fjsc/ng2-dnd-list';
import { DashboardService } from '../dashboard.service';

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
    lastIndex: number;

    chartOption: EChartOption = {
        color: ['#06a87b', '#0684a8', '#047556', '#9bdcca', '#e6f6f1', '#50a8c2'],
        xAxis: {
            type: 'category',
            data: ['RENEWAL', 'STARTUP', 'TERMINATION', 'CHANGE'],
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: { color: 'white' }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: { color: 'white' }
            }
        },
        series: [{
            data: [14687, '-', '-', '-'],
            type: 'bar',
            stack: 'full'
        },
        {
            data: ['-', 13342, '-', '-'],
            type: 'bar',
            stack: 'full'
        },
        {
            data: ['-', '-', 4644, '-'],
            type: 'bar',
            stack: 'full'
        },
        {
            data: ['-', '-', '-', 2049],
            type: 'bar',
            stack: 'full'
        }]
    };

    chartOption2: EChartOption = {
        color: ['blue'],
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
                lineStyle: { color: 'white' }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: { color: 'white' }
            }
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
    };

    constructor(private route: ActivatedRoute, private elasticSearchService: ElasticSearchService, private dashboardService: DashboardService, private router: Router) { }

    ngOnInit() {
        this.dashboardId = this.route.snapshot.paramMap.get('id');
        this.refreshDashboardData(this.dashboardId);

        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.dashboardId = this.route.snapshot.paramMap.get('id');
            this.refreshDashboardData(this.dashboardId);
        });
    }

    private refreshDashboardData(id: string) {
        this.dashboardService.getDashboard(id).subscribe(data => {
            if (data.found == false)
                this.router.navigate(['/404/2']);
            else {
                let dashboard = data._source;
                this.dashboard = dashboard;
                this.dashboard.elements.sort(this.compareElements);

                if (this.route.snapshot.paramMap.get('mode') == 'edit')
                    this.editMode = true;
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

    private navigateToEditMode(){
        this.router.navigate(['/dashboard/' + this.dashboardId + '/edit']);
    }
}
