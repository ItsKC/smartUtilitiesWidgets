import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActiveStatusWidgetService } from './active-status-widget.service'
import { ChartType, ChartOptions, ChartLegendLabelItem } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'active-status-widget',
  templateUrl: './active-status-widget.html',
  styleUrls: ['../styles/bootstrap.min.css']
})
export class ActiveStatusWidget {
  @Input() config;
  subscription: Subscription;
  private devArr: { id: string, stat: string}[];
  private ratio: number[]= [0,0];
  private pieChartOptions: ChartOptions;
  private pieChartLabels: Label[];
  private pieChartData: number[];
  private pieChartType: ChartType;
  private pieChartLegend: boolean;
  private pieChartPlugins: any[];
  private pieChartColors: any[];
  
    constructor( private service: ActiveStatusWidgetService ) {
	  // Load last measurements on every creation of this object
	  console.log("Active Status Widget Geldi");
	  this.ratio = [0,0];
	  this.devArr = [];
	}
	
	ngOnInit() {
		this.pieChartOptions = {
		responsive: true,
		legend: {
		  position: 'left',
		  labels: {
			  generateLabels: (chart: Chart) => {
				let legends = chart.data.labels.map((l:string, i) => {
					return {
						text: l + '(' + chart.data.datasets[0].data[i] + ')',
						fillStyle: chart.data.datasets[0].backgroundColor[i],
						datasetIndex: i,
						index: i

					}
				});

				return legends;
			  }
		  }
		},
		plugins: {
		  datalabels: {
			color: 'white',
			formatter: (value, ctx) => {
				if(value >0) {
					let sum = 0;
					let dataArr = ctx.chart.data.datasets[0].data;
					dataArr.forEach(data => {
						sum += data;
					});

					let percentage = (value*100 / sum).toFixed(2)+"%";
					return percentage;
				}
					return "";
			},
		  },
		}
	  };
		this.pieChartLabels = ['Aktif', 'Pasif'];
		this.pieChartData = this.ratio;
		this.pieChartType = 'pie';
		this.pieChartLegend = true;
		this.pieChartPlugins = [pluginDataLabels];
		this.pieChartColors = [
		{
		  backgroundColor: ['#CF0D4E', '#325A9B'],
		},
	  ];
		// subscription starts here
		this.subscription = this.service.subjectObs.subscribe((stats) => {
			this.devArr = stats.arr;
			this.calculatePercentage();
			this.pieChartData = this.ratio;
		});
		this.service.loadDeviceInfo();
		this.service.loadDeviceInfoRealTime();
		}
		
	  // events
	  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
		console.log(event, active);
	  }

	  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
		console.log(event, active);
	  }

	  public sum() {
		let sum = 0;
		this.pieChartData.forEach((item) => {
		  sum += item;
		});
		return sum;
	  }	
	// Calculate percentage of Device Active Status
	calculatePercentage(){
		this.ratio = [0,0];
		for (let i = 0; i<this.devArr.length; i++){
		if (this.devArr[i].stat == "AKTİF"){
			this.ratio[1]++;
			}
			else
			{
				this.ratio[0]++;
			}
		}
		console.log(this.ratio);
	}
	
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}