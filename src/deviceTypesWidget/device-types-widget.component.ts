import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceTypesWidgetService } from './device-types-widget.service'
import { ChartType, ChartOptions, ChartLegendLabelItem } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'device-types-widget',
  templateUrl: './device-types-widget.html',
  styles: [ `.panel {background-color: white;}` ]
})
export class DeviceTypesWidget {
  @Input() config;
  subscription: Subscription;
  private devArr: { id: string, stat: string}[];
  private ratio: number[]= [0,0,0,0];
  private pieChartOptions: ChartOptions;
  private pieChartLabels: Label[];
  private pieChartData: number[];
  private pieChartType: ChartType;
  private pieChartLegend: boolean;
  private pieChartPlugins: any[];
  private pieChartColors: any[];
  private labels: string[];
  
    constructor( private service: DeviceTypesWidgetService ) {
	  // Load last measurements on every creation of this object
	  console.log("Device Types Widget Geldi");
	  this.labels = ["Nb-Iot", "Lora", "Gprs", "Rf"];
	}
	
	ngOnInit(){
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
			formatter: (value, ctx) => {
				let sum = 0;
				let dataArr = ctx.chart.data.datasets[0].data;
				dataArr.forEach(data => {
					sum += data;
				});

				let percentage = (value*100 / sum).toFixed(2)+"%";
				return percentage;
			},
		  },
		}
	  };
		this.pieChartLabels = this.labels;
		this.pieChartData = this.ratio;
		this.pieChartType = 'pie';
		this.pieChartLegend = true;
		this.pieChartPlugins = [pluginDataLabels];
		this.pieChartColors = [
		{
		  backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,0,255,0.3)'],
		},
		];	
		// subscribe
		this.subscription = this.service.subjectObs.subscribe((stats) => {
			this.devArr = stats.arr;
			this.calculatePercentage();
			this.pieChartData = this.ratio;
			this.pieChartLabels = this.labels;
		});
		this.service.loadDeviceInfo();
		this.service.loadDeviceInfoRealTime();
		}
		
		calculatePercentage(){
			console.log(this.devArr);
			this.ratio = [0,0,0,0];
			this.labels = ["Nb-Iot", "Lora", "Gprs", "Rf"];
			for (let i = 0; i<this.devArr.length; i++){
				if (this.devArr[i].stat.toLowerCase().includes("nb-iot")){
					this.ratio[0]++;
				}
				else if (this.devArr[i].stat.toLowerCase().includes("lora")){
					this.ratio[1]++;
				}
				else if (this.devArr[i].stat.toLowerCase().includes("gprs")){
					this.ratio[2]++;
				}
				else if (this.devArr[i].stat.toLowerCase().includes("rf")){
					this.ratio[3]++;
				}				
				else
				{
					console.log(this.devArr[i].stat);
					let index = this.labels.indexOf(this.devArr[i].stat);
					if(index>=0){
						this.ratio[this.labels.indexOf(this.devArr[i].stat)]++;
					}
					else
					{
						this.ratio.push(1);
					}
				    this.labels.push(this.devArr[i].stat);
				}
			}
			console.log(this.ratio);
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
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}