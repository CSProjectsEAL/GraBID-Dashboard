import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

declare var $: any;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

    constructor() { }

    ngOnInit() {
        $(document).ready(function(){
            $('ul').sortable();
            $('ul').disableSelection();
        });

        $('.rulerBtn').click(function(){
            var selValue= $(this).find('input[name=size]:checked').val();

            $(this).parent().parent().removeClass('small medium large');
            $(this).parent().parent().addClass('dashboard-element ' + selValue);
        });
    }

}
