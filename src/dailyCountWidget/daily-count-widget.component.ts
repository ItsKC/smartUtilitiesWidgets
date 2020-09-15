import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { Subscription } from 'rxjs';
import { DailyCountWidgetService } from './daily-count-widget.service'
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'daily-count-widget',
  templateUrl: './daily-count-widget.html',
  styleUrls: ['../styles/bootstrap.min.css']
})
export class DailyCountWidget {
  @Input() config;
  subscription: Subscription;
  private lineChart2Data: any[];
  private lineChart2Labels: string[];
  private lineChart2Options;
  private lineChart2Colours: any[];
  private lineChart2Legend: boolean;
  private lineChart2Type: string;
  
    constructor( private demo: DailyCountWidgetService ) {
	  // Load last measurements on every creation of this object
	  console.log("Daily Count Widget Geldi");
	}
	
	ngOnInit(){
		this.lineChart2Options = {
		tooltips: {
		  enabled: true
		},
		maintainAspectRatio: false,
		scales: {
		  xAxes: [{
			gridLines: {
			  color: 'transparent',
			  zeroLineColor: 'transparent'
			},
			ticks: {
			  fontSize: 5,
			  fontColor: 'transparent'
			}
		  }],
		  yAxes: [{
			display: false,
			ticks: {
			  display: false,
			  min: 1,
			  max: 120
			}
		  }],
		},
		elements: {
		  line: {
			tension: 0.00001,
			borderWidth: 1
		  },
		  point: {
			radius: 5,
			hitRadius: 1,
			hoverRadius: 1
		  },
		},
		plugins: {
		  datalabels: {
			display: false
		  }
		}
	  };
		this.lineChart2Data = [
			{
				data: [15, 36, 110, 50, 65, 31, 70],
				fill: false,
				pointBorderColor: "#321fdb",
				pointBackgroundColor: "#321fdb",
				pointBorderWidth: '1'
			}
		];
		this.lineChart2Labels = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
		this.lineChart2Colours = [
			{ // grey
				backgroundColor: getStyle('--info'),
				borderColor: 'rgba(255,255,255,.55)'
			}
		];
		this.lineChart2Legend = false;
		this.lineChart2Type = 'line';
	}
	public sum() {
		let sum = 0;
		this.lineChart2Data[0].data.forEach((item) => {
		  sum += item;
		});
		return sum;
	}
}