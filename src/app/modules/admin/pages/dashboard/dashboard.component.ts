import { Component, OnInit } from '@angular/core';
import { ChartsService } from '@@core/services/charts.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data = {};
  pieChartData = [];
  pieChartData2 = [];
  pieChartData3 = [];
  pieChartData4 = [];
  persons;
  items;
  users;
  constructor(
    private chartsServ: ChartsService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.data.subscribe((res) => {
      this.data = res['item'];
      this.persons = res['item']['lastPersons'];
      this.items = res['item']['lastItems'];
      this.users = res['item']['lastUsers'];
      this.pieChartData.push(res['item']['allCategories']);
      this.pieChartData.push(res['item']['allSubCategories']);
      this.pieChartData.push(res['item']['allInputs']);
      this.pieChartData2.push(res['item']['allUsers']);
      this.pieChartData2.push(res['item']['allChats']);
      this.pieChartData2.push(res['item']['allMessages']);
      this.pieChartData3.push(res['item']['allItems']);
      this.pieChartData3.push(res['item']['allPersons']);
      this.pieChartData4.push(res['item']['allRequests']);
      this.pieChartData4.push(res['item']['pendingRequests']);
      this.pieChartData4.push(res['item']['approvedRequests']);
      this.pieChartData4.push(res['item']['rejectedRequests']);
    });
  }
  /*-----------------------------------------------------*/
  // Pie 1
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  pieChartLabels: Label[] = [
    ['All Categories'],
    ['All SubCategories'],
    ['All Inputs'],
  ];
  pieChartColors = [
    {
      backgroundColor: [
        'rgba(255,0,0,0.3)',
        'rgba(0,255,0,0.3)',
        'rgba(0,0,255,0.3)',
      ],
    },
  ];
  /*-----------------------------------------------------*/
  // Pie 2
  pieChartLabels2: Label[] = [['All Users'], ['All Chats'], ['All Messages']];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors2 = [
    {
      backgroundColor: [
        'rgba(0, 51, 204,0.5)',
        'rgba(102,0,102,0.3)',
        'rgba(255, 51, 204,0.3)',
      ],
    },
  ];
  /*-----------------------------------------------------*/
  // Pie 3
  pieChartLabels3: Label[] = [['All Items'], ['All Persons']];
  pieChartColors3 = [
    {
      backgroundColor: ['rgba(0, 153, 204,0.5)', 'rgba(0, 51, 102,0.3)'],
    },
  ];
  /*-----------------------------------------------------*/
  // Pie 4
  pieChartLabels4: Label[] = [
    ['All Requests'],
    ['Pending Requests'],
    ['Approve Requests'],
    [' Rejected Requests'],
  ];
  pieChartColors4 = [
    {
      backgroundColor: [
        'rgba(153, 0, 51,0.5)',
        'rgba(255, 102, 102,0.3)',
        'rgba(204, 51, 0,0.3)',
        'rgba(255, 0, 0,0.5)',
      ],
    },
  ];
  /*-----------------------------------------------------*/
  // events
  chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }
} //end of Class
