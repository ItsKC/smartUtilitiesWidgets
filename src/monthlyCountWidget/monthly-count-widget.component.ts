import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { Subscription } from 'rxjs';
import { MonthlyCountWidgetService } from './monthly-count-widget.service'
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'monthly-count-widget',
  templateUrl: './monthly-count-widget.html',
  styleUrls: ['../styles/bootstrap.min.css']
})
export class MonthlyCountWidget {
  @Input() config;
  subscription: Subscription;
  private lineChart2Data: any[];
  private lineChart2Labels: string[];
  private lineChart2Options;
  private lineChart2Colours: any[];
  private lineChart2Legend: boolean;
  private lineChart2Type: string;
  
    constructor( private service: MonthlyCountWidgetService ) {
	  // Load last measurements on every creation of this object
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
			  fontColor: 'transparent',
			  maxTicksLimit: 12
			}
		  }],
		  yAxes: [{
			display: false,
			ticks: {
			  display: false,
			  min: 1,
			  max: 60
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
				data: [12, 36, 23, 50, 12, 31, 43, 20, 10, 10, 23, 32],
				fill: false,
				pointBorderColor: "#321fdb",
				pointBackgroundColor: "#321fdb",
				pointBorderWidth: '1'
			}
		];
		this.lineChart2Labels = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
			'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
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