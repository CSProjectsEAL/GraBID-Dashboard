import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { ElasticSearchService } from '../elastic-search.service';
import { filter } from 'rxjs/operators';

declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    elements: any[] = [];
    editMode: boolean;

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

    constructor(private route: ActivatedRoute, private location: Location, private elasticSearchService: ElasticSearchService, private router: Router) { }

    ngOnInit() {
        this.refreshDashboardData(this.route.snapshot.paramMap.get('id'));

        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
            this.refreshDashboardData(this.route.snapshot.paramMap.get('id'));
        });

        console.log(this.route.snapshot.paramMap.get('id'));
        console.log(this.route.snapshot.paramMap.get('mode'));
    }

    private refreshDashboardData(id: string) {
        this.elasticSearchService.sendRequest('GET', 'dashboards/dashboard/' + id).subscribe(data => {
            this.elements = data._source.elements;
            this.elements.sort(this.compareElements);
        });

        if (this.route.snapshot.paramMap.get('mode') == 'edit')
            this.editMode = true;
            
        if (this.editMode) {
            $(document).ready(function () {
                $('#dashboard').sortable();
                $('#dashboard').disableSelection();
                $('.rulerBtn').click(function () {
                    var selValue = $(this).find('input[name=size]:checked').val();

                    $(this).parent().parent().removeClass('small medium large');
                    $(this).parent().parent().addClass('dashboard-element ' + selValue);
                });
            });
        }
    }

    private compareElements(a: any, b: any): number {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    }

}
